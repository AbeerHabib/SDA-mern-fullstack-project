import bcrypt from 'bcrypt';
import { Request } from "express";

import { UserInputType } from "../types/userType";
import { generateToken } from "./generateToken";

export const accountActivationEmailTemplate = async (req: Request) => {
    const { firstName, lastName, email, password, phone } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const tokenPayload: UserInputType = {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phone,
    };
    const token = generateToken(tokenPayload);
    const template = `<!DOCTYPE html>
    <html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
    <head>
    <title></title>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]--><!--[if !mso]><!-->
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;200;300;400;500;600;700;800;900" rel="stylesheet" type="text/css"/><!--<![endif]-->
    <style>
            * {
                box-sizing: border-box;
            }
    
            body {
                margin: 0;
                padding: 0;
            }
    
            a[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: inherit !important;
            }
    
            #MessageViewBody a {
                color: inherit;
                text-decoration: none;
            }
    
            p {
                line-height: inherit
            }
    
            .desktop_hide,
            .desktop_hide table {
                mso-hide: all;
                display: none;
                max-height: 0px;
                overflow: hidden;
            }
    
            .image_block img+div {
                display: none;
            }
    
            @media (max-width:700px) {
                .desktop_hide table.icons-inner {
                    display: inline-block !important;
                }
    
                .icons-inner {
                    text-align: center;
                }
    
                .icons-inner td {
                    margin: 0 auto;
                }
    
                .mobile_hide {
                    display: none;
                }
    
                .row-content {
                    width: 100% !important;
                }
    
                .stack .column {
                    width: 100%;
                    display: block;
                }
    
                .mobile_hide {
                    min-height: 0;
                    max-height: 0;
                    max-width: 0;
                    overflow: hidden;
                    font-size: 0px;
                }
    
                .desktop_hide,
                .desktop_hide table {
                    display: table !important;
                    max-height: none !important;
                }
    
                .row-2 .column-1 .block-3.paragraph_block td.pad {
                    padding: 20px 40px 0 !important;
                }
    
                .row-2 .column-1 .block-2.paragraph_block td.pad>div {
                    font-size: 21px !important;
                }
    
                .row-2 .column-1 .block-2.paragraph_block td.pad {
                    padding: 20px 40px 10px !important;
                }
    
                .row-3 .column-1 .block-4.paragraph_block td.pad {
                    padding: 10px 40px 30px !important;
                }
    
                .row-2 .column-1 .block-7.paragraph_block td.pad {
                    padding: 0 40px 35px !important;
                }
    
                .row-2 .column-1 .block-5.button_block td.pad {
                    padding: 20px !important;
                }
    
                .row-2 .column-1 .block-5.button_block a,
                .row-2 .column-1 .block-5.button_block div,
                .row-2 .column-1 .block-5.button_block span {
                    font-size: 16px !important;
                    line-height: 32px !important;
                }
            }
        </style>
    </head>
    <body style="background-color: #f5f7f8; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
    <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f5f7f8;" width="100%">
    <tbody>
    <tr>
    <td>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tbody>
    <tr>
    <td>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #5271ff; color: #000000; width: 680.00px; margin: 0 auto;" width="680.00">
    <tbody>
    <tr>
    <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
    <table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tr>
    <td class="pad" style="padding-bottom:20px;padding-top:20px;width:100%;padding-right:0px;padding-left:0px;">
    <div align="center" class="alignment" style="line-height:10px">
    <div style="max-width: 136px;"><img src="https://7fdb2f1351.imgdist.com/public/users/Integrators/BeeProAgency/1110879_1096354/logo_1.png" alt="logo" style="display: block; height: auto; border: 0; width: 100%;" width="136"/></div>
    </div>
    </td>
    </tr>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tbody>
    <tr>
    <td>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #5271ff; color: #000000; width: 680.00px; margin: 0 auto;" width="680.00">
    <tbody>
    <tr>
    <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; background-color: #ffffff; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
    <table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tr>
    <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
    <div align="center" class="alignment" style="line-height:10px">
    <div style="max-width: 272px;"><img src="https://7fdb2f1351.imgdist.com/public/users/Integrators/BeeProAgency/1110879_1096354/20943446.jpg" alt="img" style="display: block; height: auto; border: 0; width: 100%;" width="272"/></div>
    </div>
    </td>
    </tr>
    </table>
    <table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
    <tr>
    <td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:10px;">
    <div style="color:#333;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;font-size:24px;font-weight:700;line-height:120%;text-align:center;mso-line-height-alt:28.799999999999997px;">
    <p style="margin: 0; word-break: break-word;">Activate Your Account</p>
    </div>
    </td>
    </tr>
    </table>
    <table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
    <tr>
    <td class="pad" style="padding-left:40px;padding-right:40px;padding-top:10px;">
    <div style="color:#333;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;font-size:15px;font-weight:400;line-height:150%;text-align:left;mso-line-height-alt:22.5px;">
    <p style="margin: 0; word-break: break-word;"><span style="color: #333333;">Dear <strong>${firstName} ${lastName}</strong>,</span></p>
    </div>
    </td>
    </tr>
    </table>
    <table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
    <tr>
    <td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:5px;">
    <div style="color:#333;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;font-size:15px;font-weight:400;line-height:150%;text-align:justify;mso-line-height-alt:22.5px;">
    <p style="margin: 0;">Thank you for signing up for our shop. We are excited to have you on board!</p>
    <p style="margin: 0;">To complete your account activation, please click on the button below.</p>
    </div>
    </td>
    </tr>
    </table>
    <table border="0" cellpadding="10" cellspacing="0" class="button_block block-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tr>
    <td class="pad">
    <div align="center" class="alignment"><!--[if mso]>
    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://localhost:3000/activate-account/${token}" style="height:34px;width:196px;v-text-anchor:middle;" arcsize="80%" stroke="false" fillcolor="#5271ff">
    <w:anchorlock/>
    <v:textbox inset="0px,0px,0px,0px">
    <center style="color:#ffffff; font-family:Tahoma, Verdana, sans-serif; font-size:17px">
    <![endif]--><a href="http://localhost:3000/activate-account/${token}" style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#5271ff;border-radius:27px;width:auto;border-top:0px solid transparent;font-weight:400;border-right:0px solid transparent;border-bottom:0px solid transparent;border-left:0px solid transparent;padding-top:0px;padding-bottom:0px;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;font-size:17px;text-align:center;mso-border-alt:none;word-break:keep-all;" target="_blank"><span style="padding-left:60px;padding-right:60px;font-size:17px;display:inline-block;letter-spacing:normal;"><span style="margin: 0; word-break: break-word; line-height: 34px;">Click Here</span></span></a><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></div>
    </td>
    </tr>
    </table>
    <table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-6" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
    <tr>
    <td class="pad" style="padding-bottom:25px;padding-left:40px;padding-right:40px;padding-top:25px;">
    <div style="color:#333;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;font-size:15px;font-weight:400;line-height:150%;text-align:justify;mso-line-height-alt:22.5px;">
    <p style="margin: 0;"><span style="color: #333333;">If you did not sign up for an account or received this email by mistake, <strong><u>please disregard it</u></strong>.</span></p>
    </div>
    </td>
    </tr>
    </table>
    <table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-7" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
    <tr>
    <td class="pad" style="padding-bottom:50px;padding-left:40px;padding-right:40px;">
    <div style="color:#5271ff;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;font-size:15px;font-weight:400;line-height:150%;text-align:justify;mso-line-height-alt:22.5px;">
    <p style="margin: 0;"><strong>Welcome aboard, and thank you for choosing our shop!</strong></p>
    </div>
    </td>
    </tr>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tbody>
    <tr>
    <td>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #5271ff; color: #000000; width: 680.00px; margin: 0 auto;" width="680.00">
    <tbody>
    <tr>
    <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
    <div class="spacer_block block-1" style="height:35px;line-height:35px;font-size:1px;"> </div>
    <table border="0" cellpadding="0" cellspacing="0" class="image_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tr>
    <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
    <div align="center" class="alignment" style="line-height:10px">
    <div style="max-width: 136px;"><img alt="logo" src="https://7fdb2f1351.imgdist.com/public/users/Integrators/BeeProAgency/1110879_1096354/logo_1.png" style="display: block; height: auto; border: 0; width: 100%;" title="logo" width="136"/></div>
    </div>
    </td>
    </tr>
    </table>
    <table border="0" cellpadding="0" cellspacing="0" class="divider_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tr>
    <td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:20px;">
    <div align="center" class="alignment">
    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tr>
    <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #FFFFFF;"><span> </span></td>
    </tr>
    </table>
    </div>
    </td>
    </tr>
    </table>
    <table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
    <tr>
    <td class="pad" style="padding-bottom:45px;padding-left:40px;padding-right:40px;padding-top:10px;">
    <div style="color:#ffffff;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;font-size:12px;font-weight:400;line-height:120%;text-align:center;mso-line-height-alt:14.399999999999999px;">
    <p style="margin: 0; word-break: break-word;">CopyRight © 2023 | ElecWorld</p>
    </div>
    </td>
    </tr>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;" width="100%">
    <tbody>
    <tr>
    <td>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #5271ff; color: #000000; width: 680.00px; margin: 0 auto;" width="680.00">
    <tbody>
    <tr>
    <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
    <table border="0" cellpadding="0" cellspacing="0" class="icons_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tr>
    <td class="pad" style="vertical-align: middle; color: #1e0e4b; font-family: 'Inter', sans-serif; font-size: 15px; padding-bottom: 5px; padding-top: 5px; text-align: center;">
    <table cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tr>
    <td class="alignment" style="vertical-align: middle; text-align: center;"><!--[if vml]><table align="center" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
    <!--[if !vml]><!-->
    <table cellpadding="0" cellspacing="0" class="icons-inner" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block; margin-right: -4px; padding-left: 0px; padding-right: 0px;"><!--<![endif]-->
    <tr>
    <td style="vertical-align: middle; text-align: center; padding-top: 5px; padding-bottom: 5px; padding-left: 5px; padding-right: 6px;"><a href="http://designedwithbeefree.com/" style="text-decoration: none;" target="_blank"><img align="center" alt="Beefree Logo" class="icon" height="32" src="https://7fdb2f1351.imgdist.com/public/users/Integrators/BeeProAgency/1110879_1096354/Beefree-logo.png" style="display: block; height: auto; margin: 0 auto; border: 0;" width="34"/></a></td>
    <td style="font-family: 'Inter', sans-serif; font-size: 15px; font-weight: undefined; color: #1e0e4b; vertical-align: middle; letter-spacing: undefined; text-align: center;"><a href="http://designedwithbeefree.com/" style="color: #1e0e4b; text-decoration: none;" target="_blank">Designed with Beefree</a></td>
    </tr>
    </table>
    </td>
    </tr>
    </table>
    </td>
    </tr>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table><!-- End -->
    </body>
    </html>`
    return template;
}