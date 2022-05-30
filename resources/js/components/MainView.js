import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { Grid, Segment } from "semantic-ui-react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useParams,
} from "react-router-dom";
import ProgramsBar from "./ProgramsBar";
import ChannelsBar from "./ChannelsBar";
import UsersBar from "./UsersBar";
import Settings from "./Settings/Settings";
import Assignments from "./Assignments";
import Chat from "./Chat";
import { ProgramContext } from "./ProgramContext";
import UserContext from "./UserContext";

function MainView(props) {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [channelId, setChannelId] = useState(parseInt(useParams().channel));
    const [programId, setProgramId] = useState(parseInt(useParams().program));
    const [channel, setChannel] = useState({});
    const [messages, setMessages] = useState([]);
    const [updateChat, setUpdateChat] = useState(false);
    const [progs, setProgs] = useContext(ProgramContext);

    //Perform initial fetch
    useEffect(() => {
        fetch(
            `/api/program/init/${programId}/${
                isNaN(channelId) || channelId === undefined ? 0 : channelId
            }`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: user.token,
                },
            }
        )
            .then((response) => response.json())
            .then((data) => {
                setIsLoading(false);
                setProgs({
                    programId: programId,
                    channelId: channelId,
                    resources: data.resources,
                    programs: data.programs,
                    channels:
                        channelId !== 0
                            ? data.program.channels
                            : [...progs.channels],
                    messages: data.messages,
                    users: data.users,
                    channel: data.channel,
                    program: data.program,
                });
            });
    }, []);

    return (
        <div className="m-0">
            <Grid className="m-0">
                {!isLoading && (
                    <Grid.Row
                        columns={16}
                        className="p-0 bg-gray-900 text-gray-200"
                    >
                        <Grid.Column width={2} className="p-0 bg-gray-950">
                            <ProgramsBar />
                        </Grid.Column>
                        <Grid.Column width={2} className="p-0 bg-gray-850">
                            <ChannelsBar />
                        </Grid.Column>
                        <Grid.Column width={10} className="p-0 bg-gray-750">
                            {props.view === "channels" && (
                                <Chat
                                    initMessages={messages}
                                    channelId={channelId}
                                    channel={channel}
                                    update={updateChat}
                                />
                            )}
                            {props.view === "settings" && <Settings />}
                            {props.view === "assignments" && <Assignments />}
                        </Grid.Column>
                        <Grid.Column width={2} className="p-0 bg-gray-850">
                            <UsersBar />
                        </Grid.Column>
                    </Grid.Row>
                )}
            </Grid>
        </div>
    );
}

export default MainView;
