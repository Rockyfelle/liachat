import React, { useEffect, useState, useRef, useContext } from "react";
import { Grid, Segment, Form, Input } from "semantic-ui-react";
import Pusher from "pusher-js";
import { ProgramContext } from "./ProgramContext";

function Settings(props) {
    const inputFile = useRef(null);
    const [file, setFile] = useState(undefined);

    const onButtonClick = () => {
        inputFile.current.click();
        console.log(inputFile.current.files);
    };

    const uploadFile = () => {
        console.log(file)
    };

    return (
        <div className="h-[100vh] align-top">
            <div className="text-l w-full pt-5 px-5 border-b-2">Settings</div>
            <div className="flex flex-col m-0 p-0 overflow-auto h-[87vh] pb-5 overflow-auto">
                <p>Invite students</p>
                <p>Upload assignment</p>
                <p>create new channels</p>

                <p>Invite students</p>
                <Form>
                    <Form.Field style={{ display: "none" }}>
                        <input
                            type="file"
                            ref={inputFile}
                            onChange={() => {
                                setFile(inputFile.current.files[0]);
                            }}
                        />
                    </Form.Field>
                    <Form.Button
                        onClick={onButtonClick}
                        color="green"
                        content="Choose file"
                    />
                    <p>{file ? file.name: ''}</p>
                    <Form.Button
                        onClick={uploadFile}
                        color="green"
                        content="Upload file"
                        disabled={file===undefined}
                    />
                </Form>
            </div>
        </div>
    );
}

export default Settings;
