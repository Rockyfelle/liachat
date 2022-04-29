import React, { useEffect, useState, useRef, useContext } from "react";
import { Form } from "semantic-ui-react";
import { Grid, Segment } from "semantic-ui-react";
import Pusher from "pusher-js";
import { ProgramContext } from "./ProgramContext";

function Settings(props) {
    return (
        <div className="h-[100vh] align-top">
            <div className="text-l w-full pt-5 px-5 border-b-2">Settings</div>
            <div className="flex flex-col m-0 p-0 overflow-auto h-[87vh] pb-5 overflow-auto">
                <p>Invite students</p>
                <p>Upload assignment</p>
                <p>create new channels</p>
                
                <p>Invite students</p>
            </div>
        </div>
    );
}

export default Settings;
