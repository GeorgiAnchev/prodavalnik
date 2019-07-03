import React, { Component } from 'react';
import { ReCaptcha } from 'react-recaptcha-google';

class ReCaptchaComponent extends Component {
      constructor(props, context) {
            super(props, context);
            this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this);
            this.verifyCallback = this.verifyCallback.bind(this);
      }

      componentDidMount() {
            if (this.captchaDemo) {
                  this.captchaDemo.reset();
            }
      }

      onLoadRecaptcha() {
            if (this.captchaDemo) {
                  this.captchaDemo.reset();
            }
      }

      verifyCallback(recaptchaToken) {
            this.props.raiseToken(recaptchaToken);
      }

      render() {
            return (
                  <div>
                        <ReCaptcha
                              ref={(el) => { this.captchaDemo = el; }}
                              size="normal"
                              data-theme="dark"
                              render="explicit"
                              sitekey="6LeNK6sUAAAAAFrBOVO1O8mFG0uLOeDnJ26gXEQ0"
                              onloadCallback={this.onLoadRecaptcha}
                              verifyCallback={this.verifyCallback}
                        />
                  </div>
            );
      };
};
export default ReCaptchaComponent;