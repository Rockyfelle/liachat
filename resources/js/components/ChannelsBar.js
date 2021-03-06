import React, { useState, useEffect, useRef, useContext } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { Grid, Segment, Icon } from "semantic-ui-react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useParams,
} from "react-router-dom";
import { ProgramContext } from "./ProgramContext";

function ChannelsBar(props) {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const navigate = useNavigate();
    const [progs, setProgs] = useContext(ProgramContext);
    const [isLoading, setIsLoading] = useState(true);

    const isMounted = useRef(false);

    //Update channels from parent
    /*useEffect(() => {
		//setChannels(props.channels);
		setProgs(prevProgs => { return {...prevProgs, channels: props.channels} });
	}, [props.channels]);

	//Update channelId from parent
	useEffect(() => {
		//setChannelId(props.channelId);
		setProgs(prevProgs => { return {...prevProgs, channelId: data.channelId} });
	}, [props.channelId]);*/

    //Load channels when switching program id
    useEffect(() => {
        if (isMounted.current) {
            fetch(`/api/program/load/${progs.programId}/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: user.token,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    //setChannels(data.channels);
                    setProgs((prevProgs) => {
                        return {
                            ...prevProgs,
                            channels: data.program.channels,
                        };
                    });
                    setIsLoading(false);
                });
        } else {
            isMounted.current = true;
        }
    }, [progs.programId]);

    return (
        <div className="h-[100vh] align-top border-r-1">
            <div className="text-l text-black w-full pt-5 px-5 ">
            </div>
            <div className="flex flex-col m-0 overflow-auto h-[87vh] pb-5 overflow-auto p-2 pr-0">
                {user.role !=='student' && <div
                    className={`flex flex-row p-2 px-5 mb-2 rounded-l-lg cursor-pointer align-middle place-content-between 
                    ${props.view === 'settings' ? 'bg-gradient-to-l from-violet-900 to-violet-600' : 'bg-violet-900'}`}
                    onClick={() => {
                        setProgs((prevProgs) => {
                            return {
                                ...prevProgs,
                                channelId: undefined,
                            };
                        });
                        window.history.replaceState(
                            null,
                            "",
                            `/program/${progs.programId}/settings`
                        );
                        navigate(`/program/${progs.programId}/settings`);
                    }}
                >
                    <p className="p-0 m-0">Settings</p>
                    <Icon className="p-0 m-0" name="settings" />
                </div>}
                <div
                    className={`flex flex-row p-2 px-5 mb-2 rounded-l-lg cursor-pointer align-middle place-content-between
                    ${props.view === 'assignments' ? 'bg-gradient-to-l from-orange-700 to-orange-500' : 'bg-orange-700'}`}
                    onClick={() => {
                        setProgs((prevProgs) => {
                            return {
                                ...prevProgs,
                                channelId: undefined,
                            };
                        });
                        window.history.replaceState(
                            null,
                            "",
                            `/program/${progs.programId}/assignments`
                        );
                        navigate(`/program/${progs.programId}/assignments`);
                    }}
                >
                    <p className="p-0 m-0">Assignments</p>
                    <Icon className="p-0 m-0" name="file" />
                </div>
                {progs.channels.map((channel, index) => {
                    return (
                        <div
                            key={"message" + index}
                            className={`p-2 px-5 mb-2 rounded-l-lg cursor-pointer ${
                                channel.id === progs.channelId
                                    ? "bg-gradient-to-l from-gray-750 to-gray-500"
                                    : "bg-gray-700"
                            }`}
                            onClick={() => {
                                setProgs((prevProgs) => {
                                    return {
                                        ...prevProgs,
                                        channelId: channel.id,
                                        channel: channel,
                                    };
                                });
                                window.history.replaceState(
                                    null,
                                    "",
                                    `/program/${progs.programId}/channel/${channel.id}`
                                );
                                navigate(
                                    `/program/${progs.programId}/channel/${channel.id}`
                                );
                            }}
                        >
                            <p>{channel.name}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ChannelsBar;
