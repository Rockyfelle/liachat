import React, { useEffect, useState, useRef, useContext } from "react";
import { Grid, Segment, Form, Input, Menu, Button } from "semantic-ui-react";
import Pusher from "pusher-js";
import { ProgramContext } from "../ProgramContext";
import styled from "styled-components";

const DFormInput = styled(Form.Input)`
    > * {
        color: white !important;
    }
    input {
        background-color: #3c4f69 !important;
        color: white !important;
    }
`;

function SettingsChannels(props) {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [progs, setProgs] = useContext(ProgramContext);
    const [name, setName] = useState("");

    function createChannel(){
        fetch(`/api/channel/${progs.programId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: user.token,
            },
            body: JSON.stringify({
                channel_name: name,
                hidden: 0,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.ok) {
                    setProgs((prevProgs) => {
                        return {
                            ...prevProgs,
                            channels: data.program.channels,
                        };
                    });
                }
            });
    };

	function deleteChannel(id){
		fetch(`/api/channel/${progs.programId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: user.token,
            },
            body: JSON.stringify({
                id
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.ok) {
                    setProgs((prevProgs) => {
                        return {
                            ...prevProgs,
                            channels: data.program.channels,
                        };
                    });
                }
            });
	} 

    return (
        <div className="h-[100%] align-top grid place-items-center">
            <Grid className="w-[50%]">
                <Grid.Row></Grid.Row>
                <Grid.Row columns="equal">
                    <Grid.Column>
                        <Form>
                            <DFormInput
                                label="Name"
                                fluid
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row className="mb-10">
                    <Grid.Column>
                        <Button color="green" fluid onClick={createChannel}>
                            Add Channel
                        </Button>
                    </Grid.Column>
                </Grid.Row>
                {progs.channels.map((channel, index) => {
                    return (
                        <Grid.Row key={"channel" + index}>
                            <Grid.Column width={10} className="text-2xl">
                                <h1 className="text-2xl">{channel.name}</h1>
                            </Grid.Column>
                            <Grid.Column width={6}>
                                <Button color="red" fluid onClick={()=> deleteChannel(channel.id)}>
                                    Remove
                                </Button>
                            </Grid.Column>
                        </Grid.Row>
                    );
                })}
            </Grid>
        </div>
    );
}

export default SettingsChannels;
