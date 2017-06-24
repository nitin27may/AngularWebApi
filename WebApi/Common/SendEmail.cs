using System;
using System.Configuration;
using System.IO;
using System.Net;
using System.Net.Mail;
using System.Web;

namespace WebApi.Common
{
    public static class SendEmail
    {
        public static void Send(String ToEmail, string cc, string bcc, String Subj, string Message)
        {
            //Reading sender Email credential from web.config file

            var smtpServer = ConfigurationManager.AppSettings["Host"].ToString();
            var FromEmailid = ConfigurationManager.AppSettings["FromMail"].ToString();
            var password = ConfigurationManager.AppSettings["word"].ToString();

            //creating the object of MailMessage
            MailMessage mailMessage = new MailMessage();
            mailMessage.From = new MailAddress(FromEmailid); //From Email Id
            mailMessage.Subject = Subj; //Subject of Email
            mailMessage.Body = Message; //body or message of Email
            mailMessage.IsBodyHtml = true;

            string[] ToMuliId = ToEmail.Split(',');
            foreach (string ToEMailId in ToMuliId)
            {
                mailMessage.To.Add(new MailAddress(ToEMailId)); //adding multiple TO Email Id
            }


            if (cc != null && cc != "")
            {
                string[] CCId = cc.Split(',');

                foreach (string CCEmail in CCId)
                {
                    mailMessage.CC.Add(new MailAddress(CCEmail)); //Adding Multiple CC email Id
                }
            }

            if (bcc != null && bcc != "")
            {

                string[] bccid = bcc.Split(',');

                foreach (string bccEmailId in bccid)
                {
                    mailMessage.Bcc.Add(new MailAddress(bccEmailId)); //Adding Multiple BCC email Id
                }
            }
            SmtpClient smtp = new SmtpClient();  // creating object of smptpclient
            smtp.Host = smtpServer;              //host of emailaddress for example smtp.gmail.com etc

            //network and security related credentials

            smtp.EnableSsl = true;
            NetworkCredential NetworkCred = new NetworkCredential();
            NetworkCred.UserName = mailMessage.From.Address;
            NetworkCred.Password = password;
            smtp.UseDefaultCredentials = true;
            smtp.Credentials = NetworkCred;
            smtp.Port = 587;
            smtp.Send(mailMessage); //sending Email
        }
        public static string CreateEmailBody(string firstName, string generatedToken, string baseURL)

        {

            string body = string.Empty;
            //using streamreader for reading my htmltemplate   

            using (StreamReader reader = new StreamReader(HttpContext.Current.Server.MapPath("~/Template/emailTemplate.html")))

            {

                body = reader.ReadToEnd();

            }

            body = body.Replace("{FirstName}", firstName); //replacing the required things  

            body = body.Replace("{baseURL}", baseURL);

            body = body.Replace("{generatedToken}", generatedToken);

            return body;

        }
    }
}