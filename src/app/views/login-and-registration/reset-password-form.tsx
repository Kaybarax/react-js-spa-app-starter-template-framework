/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import { Helmet } from 'react-helmet';
import { TITLE } from '../../app-config';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ResetPasswordForm(props: any) {
  const { loginStore } = props;
  // const showLogin = () => {
  //   loginStore.pageAction = LOGIN_PAGE_ACTIONS_ENUM.LOGIN;
  // };

  return (
    <div>
      <Helmet>
        <title>{TITLE} - Reset Password</title>
      </Helmet>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card card-body">
              <h3>Reset Password</h3>
              <form>
                <div className="form-group">
                  <label>Enter your email address</label>
                  <input
                    type="email"
                    className="form-control"
                    value={loginStore.resetPasswordForm.email}
                    onChange={e => (loginStore.resetPasswordForm.email = e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={e => {
                    e.preventDefault();
                    loginStore.resetPassword();
                  }}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
