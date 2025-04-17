/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import { Helmet } from 'react-helmet';
import { TITLE } from '../../app-config';
import { handleResetPassword } from '../../controllers/login-controller';

export function ResetPasswordForm(props: any) {
  const { resetPasswordModel, notificationAlert } = props;
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
                    value={resetPasswordModel?.usernameOrEmail || ''}
                    onChange={e => {
                      if (resetPasswordModel) {
                        resetPasswordModel.usernameOrEmail = e.target.value;
                      }
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={e => {
                    e.preventDefault();
                    // Call the reset password handler from login-controller
                    handleResetPassword(notificationAlert);
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
