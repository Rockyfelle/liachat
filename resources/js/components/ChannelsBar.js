import React, { useState, useEffect, useRef, useContext } from "react";
import ReactDOM from "react-dom";
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
                        return { ...prevProgs, channels: data.channels };
                    });
                    setIsLoading(false);
                });
        } else {
            isMounted.current = true;
        }
    }, [progs.programId]);

    return (
        <div className="h-[100vh] align-top border-r-1">
            <div className="text-l text-black w-full pt-5 px-5 border-b-2">
                <b>Channels</b>
            </div>
            <div className="flex flex-col m-0 overflow-auto h-[87vh] pb-5 overflow-auto p-2 pr-0">
				<div className="flex flex-row p-2 px-5 mb-2 rounded-l-lg cursor-pointer bg-violet-900 align-middle place-content-between" 
				onClick={() => {
					setProgs((prevProgs) => {
						return {
							...prevProgs,
							channelId: 'settings',
						};
					});
				}}
				>
					<p className="p-0 m-0">Settings</p>
					<Icon className="p-0 m-0" name="settings" />
				</div>
                <div className="flex flex-row p-2 px-5 mb-2 rounded-l-lg cursor-pointer bg-orange-700 align-middle place-content-between" 
				onClick={() => {
					setProgs((prevProgs) => {
						return {
							...prevProgs,
							channelId: 'assignments',
						};
					});
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
                                    };
                                });
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
