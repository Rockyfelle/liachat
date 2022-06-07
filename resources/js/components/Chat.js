import React, { useEffect, useState, useRef, useContext } from "react";
import { Form } from "semantic-ui-react";
import { Grid, Segment } from "semantic-ui-react";
import Pusher from "pusher-js";
import { ProgramContext } from "./ProgramContext";
import BeatLoader from "react-spinners/BeatLoader";

function Chat(props) {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [progs, setProgs] = useContext(ProgramContext);
    const [isLoading, setIsLoading] = useState(true);
    const [channel, setChannel] = useState(props.channel);
    const [channelId, setChannelId] = useState(props.channelId);
    const [messages, setMessages] = useState(props.initMessages);
    const [sendMessages, setSendMessages] = useState([]);
    const [input, setInput] = useState("");
    const [tick, setTick] = useState(false);
    const [int, setInt] = useState(null);
    const [pusher, setPusher] = useState(undefined);
    const [broadcast, setBroadcast] = useState(undefined);
    const isMounted = useRef(false);
    const [privatePusher, setPrivatePusher] = useState(undefined);
    const [privateBroadcast, setPrivateBroadcast] = useState(undefined);

    //Load messages when switching channel id
    useEffect(() => {
        if (true) {
            setIsLoading(true);
            fetch(`/api/channel/load/${progs.channelId}/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: user.token,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.exists) {
                        setProgs((prevProgs) => {
                            return { ...prevProgs, messages: data.messages };
                        });
                    } else {
                        setProgs((prevProgs) => {
                            return { ...prevProgs, messages: [] };
                        });
                    }
                    setIsLoading(false);
                });
        } else {
            isMounted.current = true;
        }
    }, [progs.channelId]);

    function postMessage() {
        if (input.length > 0) {
            setInput("");
            const messageId = (Math.random() + 1).toString(16);
            setSendMessages([
                ...sendMessages,
                {
                    content: input,
                    created_at: "2022-04-12T21:20:12.000000Z",
                    senderId: messageId,
                },
            ]);
            fetch(`/api/message/${progs.channelId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: user.token,
                },
                body: JSON.stringify({
                    content: input,
                    senderId: messageId,
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    //setSendMessages([]);
                });
        }
    }
    //When in a new channel, bind new websocket
    useEffect(() => {
        if (channel !== undefined && progs.channelId !== null) {
            const privatePusher = new Pusher(process.env.MIX_PUSHER_APP_KEY, {
                cluster: "eu",
                authEndpoint: "/api/pusher",
                auth: {
                    headers: {
                        Authorization: user.token,
                    },
                },
            });
            const broadcastChannel = privatePusher.subscribe(
                "private-channel" + progs.channelId
            );
            broadcastChannel.bind("new_message", function (data) {
                const parsed = data.message;

                setSendMessages((prevMessages) =>
                    prevMessages.filter(
                        (x) =>
                            parsed.messages.find(
                                (y) => y.senderId === x.senderId
                            ) === undefined
                    )
                );
                //setMessages(prevMessages => (parsed.messages.concat(prevMessages)));

                //Update progs
                setProgs((prevProgs) => {
                    return {
                        ...prevProgs,
                        messages: parsed.messages.concat(prevProgs.messages),
                    };
                });
            });

            setPrivatePusher(privatePusher);
            setPrivateBroadcast(broadcastChannel);

            return () => {
                broadcastChannel.unbind("new_message");
                broadcastChannel.unsubscribe();
            };
        }

        return () => {
            if (broadcast) broadcast.unbind("broadcaster");
        };
    }, [progs.channelId]);

    return (
        <div className="h-[100vh] align-top">
            <div className="text-l w-full pt-5 px-5 border-b-2">
                {progs?.channel?.name ?? ""}
            </div>
            {isLoading && (
                <div className="grid place-items-center h-[87vh]">
                    <BeatLoader color="teal" size={50} />
                </div>
            )}
            {!isLoading && (
                <div className="flex flex-col-reverse m-0 p-0 overflow-auto h-[87vh] pb-5 overflow-auto">
                    {sendMessages.reverse().map((message, index) => {
                        return (
                            <div key={"message" + index} className="p-3 px-5">
                                <div className="text-l w-full pb-2 text-gray-500">
                                    <div className="flex align-bottom">
                                        <p className="text-2xl mr-5 font-bold">
                                            {user.name}
                                        </p>
                                        <p className="text-xs text-gray-700 align-bottom pt-3">
                                            {message.created_at.substr(0, 10)}{" "}
                                            at{" "}
                                            {message.created_at.substr(11, 8)}
                                        </p>
                                    </div>
                                    <p className="text-xl">{message.content}</p>
                                </div>
                            </div>
                        );
                    })}
                    {progs.messages.map((message, index) => {
                        return (
                            <div key={"message" + index} className="p-3 px-5">
                                <div className="text-l w-full pb-2">
                                    <div className="flex align-bottom">
                                        <p className="text-2xl mr-5 font-bold">
                                            {message.user.name}
                                        </p>
                                        <p className="text-xs text-gray-500 align-bottom pt-3">
                                            {message.created_at.substr(0, 10)}{" "}
                                            at{" "}
                                            {message.created_at.substr(11, 8)}
                                        </p>
                                    </div>
                                    <p className="text-xl">{message.content}</p>
                                </div>
                            </div>
                        );
                    })}
                    <div></div>
                </div>
            )}
            <div className="text-l text-black w-full px-5 mt-10">
                <Form>
                    <Form.Input
                        fluid
                        action={{
                            content: "Post",
                            onClick: postMessage,
                        }}
                        disabled={isLoading}
                        placeholder="Message @admin"
                        value={input}
                        onChange={(e, { value }) => setInput(value)}
                    />
                </Form>
            </div>
        </div>
    );
}

export default Chat;
