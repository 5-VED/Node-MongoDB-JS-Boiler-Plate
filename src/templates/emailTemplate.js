const sendOTP = (to, otp) => {
  const text = `<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
    <meta charset="utf-8">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
    <!--[if mso]>
        <xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml>
        <style>
          td,th,div,p,a,h1,h2,h3,h4,h5,h6 {font-family: "Segoe UI", sans-serif; mso-line-height-rule: exactly;}
        </style>
      <![endif]-->
    <title>Welcome to PixInvent 👋</title>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
        integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link
        href="https://fonts.googleapis.com/css?family=Montserrat:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700"
        rel="stylesheet" media="screen">
    <style>
        .hover-underline:hover {
            text-decoration: underline !important;
        }

        .fa-facebook {
            color: blue;
            font-size: 24px;
        }

        .fa-twitter {
            color: #1da1f2;
            font-size: 24px;
        }

        .fa-instagram {
            font-size: 24px;
            color: red;
        }

        .fontstyle {
            font-family: 'Montserrat', sans-serif;
        }

        @keyframes spin {
            to {
                transform: rotate(360deg);
            }
        }

        @keyframes ping {

            75%,
            100% {
                transform: scale(2);
                opacity: 0;
            }
        }

        @keyframes pulse {
            50% {
                opacity: .5;
            }
        }

        @keyframes bounce {

            0%,
            100% {
                transform: translateY(-25%);
                animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
            }

            50% {
                transform: none;
                animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
            }
        }

        @media (max-width: 600px) {
            .sm-leading-32 {
                line-height: 32px !important;
            }

            .sm-px-24 {
                padding-left: 24px !important;
                padding-right: 24px !important;
            }

            .sm-py-32 {
                padding-top: 32px !important;
                padding-bottom: 32px !important;
            }

            .sm-w-full {
                width: 100% !important;
            }
        }
    </style>
</head>

<body class="fontstyle"
    style="margin: 0; padding: 0; width: 100%; word-break: break-word; -webkit-font-smoothing: antialiased; background-color: #fff;">
    <div style="display: none;">We are please to welcome you to PixInvent</div>
    <div role="article" aria-roledescription="email" aria-label="Welcome to PixInvent 👋" lang="en">
        <table style="font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; width: 100%;" width="100%"
            cellpadding="0" cellspacing="0" role="presentation">
            <tr>
                <td align="center"
                    style="background-color: #fff; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif;"
                    bgcolor="rgba(236, 239, 241, var(--bg-opacity))">
                    <table class="sm-w-full" style="font-family: 'Montserrat',Arial,sans-serif; width: 600px;"
                        width="600" cellpadding="0" cellspacing="0" role="presentation">
                        <tr>
                            <td align="center" class="sm-px-24" style="font-family: 'Montserrat',Arial,sans-serif;">
                                <table style="font-family: 'Montserrat',Arial,sans-serif; width: 100%;" width="100%"
                                    cellpadding="0" cellspacing="0" role="presentation">
                                    <tr>
                                        <td class="sm-px-24"
                                            style="background-color:#f95a500a; border-radius: 4px; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; font-size: 14px; line-height: 24px; padding: 48px; text-align: left; color: #626262;"
                                            align="left">
                                            <div style="text-align: center;"><img src="${process.env.LIVE_URL}/logo.png"
                                                    style="height: 80px; width: 80px;"></div>

                                            <p style="font-weight: 600; font-size: 18px; margin-bottom: 0;">Hello,</p>

                                            <p style="margin: 24px 0; color: #626262;">

                                                A request to reset password was received form your <span
                                                    style="font-weight: 600; color: #626262;">Node</span>
                                                Account ${to}
                                            <p style=“margin-bottom : 10px”>
                                                Use this OTP to reset your password and login
                                                </ul>
                                            <table style="font-family: 'Montserrat',Arial,sans-serif;" cellpadding="0"
                                                cellspacing="0" role="presentation">
                                                <tr>
                                                    <td
                                                        style="mso-padding-alt: 16px 24px; background-color: #ff5850; border-radius: 4px; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif;">
                                                        <a target="_blank"
                                                            style="display: block; font-weight: 600; font-size: 14px; line-height: 100%; padding: 16px 24px; color: #ffffff; text-decoration: none;">${otp}</a>
                                                    </td>
                                                </tr>
                                            </table>
                                            <table style="font-family: 'Montserrat',Arial,sans-serif; width: 100%;"
                                                width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                                <tr>
                                                    <td
                                                        style="font-family: 'Montserrat',Arial,sans-serif; padding-top: 32px; padding-bottom: 32px;">
                                                        <span style="font-weight: 600; color: #626262;">Note:</span>
                                                        This OTP is valid for 10 minutes from the time it was sent to
                                                        you and
                                                        can be used to change your password only once
                                                        <div
                                                            style=" background-color: #fff; height: 2px; line-height: 1px; margin-bottom: 32px;">
                                                            &zwnj;</div>
                                                        <p style="margin: 0 0 16px;">
                                                            Not sure why you received this email? ignore this
                                                        </p>
                                                        <p style="margin: 0 0 16px;">Thanks, <br>The Node Team</p>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>

                                    </tr>
                                    <tr>
                                        <td style="font-family: 'Montserrat',Arial,sans-serif; height: 20px;"
                                            height="20"></td>
                                    </tr>
                                    <tr>
                                        <td style="font-family: 'Montserrat',Arial,sans-serif; height: 16px;"
                                            height="16"></td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>
</body>

</html>`;
  return text;
};

const employeeRegister = (firstName, lastName, to, password) => {
  return `<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
    <meta charset="utf-8">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
    <!--[if mso]>
    <xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml>
    <style>
      td,th,div,p,a,h1,h2,h3,h4,h5,h6 {font-family: "Segoe UI", sans-serif; mso-line-height-rule: exactly;}
    </style>
  <![endif]-->

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
        integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link
        href="https://fonts.googleapis.com/css?family=Montserrat:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700"
        rel="stylesheet" media="screen">
    <style>
        .hover-underline:hover {
            text-decoration: underline !important;
        }

        .fa-facebook {
            color: blue;
            font-size: 24px;
        }

        .fa-twitter {
            color: #1da1f2;
            font-size: 24px;
        }

        .fa-instagram {
            font-size: 24px;
            color: red;
        }

        .fontstyle {
            font-family: 'Montserrat', sans-serif;
        }

        @keyframes spin {
            to {
                transform: rotate(360deg);
            }
        }

        @keyframes ping {

            75%,
            100% {
                transform: scale(2);
                opacity: 0;
            }
        }

        @keyframes pulse {
            50% {
                opacity: .5;
            }
        }

        @keyframes bounce {

            0%,
            100% {
                transform: translateY(-25%);
                animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
            }

            50% {
                transform: none;
                animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
            }
        }

        @media (max-width: 600px) {
            .sm-leading-32 {
                line-height: 32px !important;
            }

            .sm-px-24 {
                padding-left: 24px !important;
                padding-right: 24px !important;
            }

            .sm-py-32 {
                padding-top: 32px !important;
                padding-bottom: 32px !important;
            }

            .sm-w-full {
                width: 100% !important;
            }
        }
    </style>
</head>

<body class="fontstyle"
    style="margin: 0; padding: 0; width: 100%; word-break: break-word; -webkit-font-smoothing: antialiased; background-color: #fff;">
    <div style="display: none;">We are please to welcome you to PixInvent</div>
    <div role="article" aria-roledescription="email" aria-label="Welcome to PixInvent 👋" lang="en">
        <table style="font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; width: 100%;" width="100%"
            cellpadding="0" cellspacing="0" role="presentation">
            <tr>
                <td align="center"
                    style="background-color: #fff; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif;"
                    bgcolor="rgba(236, 239, 241, var(--bg-opacity))">
                    <table class="sm-w-full" style="font-family: 'Montserrat',Arial,sans-serif; width: 600px;"
                        width="600" cellpadding="0" cellspacing="0" role="presentation">
                        <tr>
                            <td align="center" class="sm-px-24" style="font-family: 'Montserrat',Arial,sans-serif;">

                                <table style="font-family: 'Montserrat',Arial,sans-serif; width: 100%;" width="100%"
                                    cellpadding="0" cellspacing="0" role="presentation">
                                    <tr>
                                        <td class="sm-px-24"
                                            style="background-color:#f95a500a; border-radius: 4px; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; font-size: 14px; line-height: 24px; padding: 48px; text-align: left; color: #626262;"
                                            align="left">
                                            <div style="height: 80px; width: 80px;"> <img src="${process.env.LIVE_URL}/logo.png" style="height: 40px; width: 100px; margin: 18px 10px;"></div>
                                            <p
                                                style="font-weight: 600; font-size: 22px; margin-bottom: 0; text-align: center;">
                                                Congratulations 🎉
                                            </p>
                                            <p style="margin-bottom: 0;text-align: center">
                                                You are invited to be a employee by the Node.
                                            </p>
                                            <p style="font-weight: 600; font-size: 18px; margin-bottom: 0;">Hello,</p>
                                            <p
                                                style="font-weight: 700; font-size: 20px; margin-top: 0; color: #ff5850;">
                                                ${
                                                  firstName
                                                } ${lastName}!</p>

                                            <p style="font-weight: 600; font-size: 18px; margin-bottom: 0;">
                                                <span style="font-weight: 600; color: #626262; "></span>
                                                Your account is registered.
                                            </p>
                                            <p class="sm-leading-32"
                                                style="font-weight: 600; font-size: 20px; margin: 0 0 24px; --text-opacity: 1; color: #263238; color: rgba(38, 50, 56, var(--text-opacity));">
                                            </p>
                                            <p style="margin: 10px 0; color: #626262;">
                                                We have register your information and we are allowing you as employee.


                                                </a>
                                                </ul>
                                            <table style="font-family: 'Montserrat',Arial,sans-serif;" cellpadding="0"
                                                cellspacing="0" role="presentation">
                                                <tr>
                                                    <p style="font-weight: 600; font-size: 18px; margin-bottom: 0;">
                                                        Your Account details :
                                                    </p>
                                                    </p>
                                                    <p style="margin: 10px 0; color: #626262;">
                                                        <span style="font-weight: 600; color: #626262;">Email : </span>
                                                        ${to}
                                                    </p>
                                                    <p style="margin: 10px 0 20px ; color: #626262;">
                                                        <span style="font-weight: 600; color: #626262;">Password :
                                                        </span>
                                                        ${password}
                                                    </p>
                                                    <td
                                                        style="mso-padding-alt: 16px 24px; background-color: #ff5850; border-radius: 4px; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif;">

                                                    </td>
                                                </tr>
                                            </table>
                                            <table style="font-family: 'Montserrat',Arial,sans-serif; width: 100%;"
                                                width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                                <tr>

                                                    <td
                                                        style="font-family: 'Montserrat',Arial,sans-serif; padding-top: 32px; padding-bottom: 32px;">
                                                        <div
                                                            style=" background-color: #fff; height: 2px; line-height: 1px; margin-bottom: 32px;">
                                                            &zwnj;</div>
                                                        <p style="margin: 0 0 16px;">
                                                            Not sure why you received this email? ignore this
                                                        </p>
                                                        <p style="margin: 0 0 16px;">Thanks, <br>The Node
                                                            Team</p>
                                                    </td>
                                                </tr>
                                            </table>

                                        </td>

                                    </tr>
                                    <tr>
                                        <td style="font-family: 'Montserrat',Arial,sans-serif; height: 20px;"
                                            height="20"></td>
                                    </tr>
                                    <tr>
                                        <td style="font-family: 'Montserrat',Arial,sans-serif; height: 16px;"
                                            height="16"></td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>
</body>

</html>`;
};

module.exports = {
  sendOTP,
  employeeRegister,
};
