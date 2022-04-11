import React from "react";
import {
  Form,
  Button,
  Grid,
  Header as SemanticHeader,
  Segment,
} from "semantic-ui-react";


function LoginPage(){
  return (
    <div>

      <Grid centered>
        <Grid.Column style={{ maxWidth: 550, marginTop: 150 }}>
          <SemanticHeader>Login to your account</SemanticHeader>

          <Segment>
            <Form>
              <Form.Field>
                <Form.Input

                  name="username"
                  placeholder="Username"
                  label="Username"
                />
              </Form.Field>

              <Form.Field>
                <Form.Input
                  
                  type="password"
                  name="password"
                  placeholder="Password"
                  label="Password"
                />
              </Form.Field>

              <Button
                fluid
                primary
                type="submit"
              >
                Login
              </Button>

              <Segment>
                Need an account? <a href="#">this link doesn't work</a>
              </Segment>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default LoginPage;