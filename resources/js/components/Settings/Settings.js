import React, { useEffect, useState, useRef, useContext } from "react";
import { Grid, Segment, Form, Input, Menu } from "semantic-ui-react";
import SettingsChannels from "./SettingsChannels";
import SettingsUsers from "./SettingsUsers";
import SettingsAssignments from "./SettingsAssignments";
import SettingsPings from "./SettingsPings";

function Settings(props) {
    const inputFile = useRef(null);
    const [file, setFile] = useState(undefined);
    const [tab, setTab] = useState("channels");

    return (
        <div className="h-[100vh] align-top overflow-auto">
            <div className="text-l w-full pt-5 px-5 border-b-2">Settings</div>
            <div className="grid place-items-center mt-[100px] max-h-full">
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
