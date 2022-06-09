import React, { useEffect, useState, useRef, useContext } from "react";
import { Grid, Segment, Form, Input, Menu } from "semantic-ui-react";
import SettingsChannels from "./SettingsChannels";
import SettingsUsers from "./SettingsUsers";
import SettingsAssignments from "./SettingsAssignments";
import SettingsPings from "./SettingsPings";
import { ProgramContext } from "../ProgramContext";
function Settings(props) {
    const [progs, setProgs] = useContext(ProgramContext);
    const inputFile = useRef(null);
    const [file, setFile] = useState(undefined);
    const [tab, setTab] = useState("channels");
    const currentProgram = progs.programs.find((p) => p.id === progs.programId);
    return (
        <div className="h-[100vh] align-top overflow-auto">
            <div className="text-l w-full pt-5 px-5 "></div>
            <div className="grid place-items-center mt-[100px] max-h-full">
                <h1>{currentProgram?.name}</h1>
                <Menu pointing secondary inverted>
                    <Menu.Item
                        name="Channels"
                        active={tab === "channels"}
                        onClick={() => setTab("channels")}
                    />
                    <Menu.Item
                        name="Users"
                        active={tab === "users"}
                        onClick={() => setTab("users")}
                    />
                    <Menu.Menu>
                        <Menu.Item
                            name="Pings"
                            active={tab === "pings"}
                            onClick={() => setTab("pings")}
                        />
                    </Menu.Menu>
                </Menu>
            </div>
            <div className="m-5">
                {tab === "channels" && <SettingsChannels />}
                {tab === "users" && <SettingsUsers />}
                {tab === "pings" && <SettingsPings />}
                {tab === "assignments" && <SettingsAssignments />}
            </div>
        </div>
    );
}

export default Settings;
