export const createHTML = details => {
  const {playlistName, exercises, createdBy, assignedTo} = details;

  return `<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">

    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>${playlistName}</title>
        <style type="text/css">
            * {
                margin: 0;
                padding: 0;
                text-indent: 0;
            }
    
            h1 {
                color: black;
                font-family: Arial, sans-serif;
                font-style: normal;
                font-weight: bold;
                text-decoration: none;
                font-size: 26pt;
                margin-top: 40pt;
                margin-left: 40pt;
            }
    
            p {
                color: black;
                font-family: Arial, sans-serif;
                font-style: normal;
                font-weight: bold;
                text-decoration: none;
                font-size: 11pt;
                margin-top: 10pt;
                margin-left: 40pt;
            }
    
            h2 {
                color: #1154CC;
                font-family: Arial, sans-serif;
                font-style: normal;
                font-weight: bold;
                text-decoration: underline;
                font-size: 11pt;
            }
    
            a {
                color: #1154CC;
                font-family: Arial, sans-serif;
                font-style: normal;
                font-weight: bold;
                text-decoration: none;
                font-size: 11pt;
            }
        </style>
    </head>
    
    <body>
        <h1 style="padding-top: 3pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">${playlistName}</h1>
        <p style="text-indent: 0pt;text-align: left;"><br /></p>
        <p style="padding-left: 5pt;text-indent: 0pt;text-align: left;">Created By: ${createdBy}
        </p>
        <p style="padding-left: 5pt;text-indent: 0pt;text-align: left;">Assigned To:${assignedTo}
        </p>
        <p style="text-indent: 0pt;text-align: left;" />
        <p style="padding-top: 4pt;padding-left: 257pt;text-indent: 0pt;text-align: left;"><a
                href="https://healthgainz.com/terms-of-service/"
                style=" color: #1154CC; font-family:Arial, sans-serif; font-style: normal; font-weight: bold; text-decoration: none; font-size: 11pt;"
                target="_blank">Powered by: Healthgainz </a>
        </p>

        ${exercises.map(exercise => {
          return `<p style="padding-top: 6pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">${
            exercise?.name
          }</p>
                    <p style="padding-top: 1pt;padding-left: 5pt;text-indent: 0pt;line-height: 114%;text-align: left;">Reps: ${
                      exercise?.reps || 'n/a'
                    } Sets: ${exercise?.sets || 'n/a'}
                        Hold:${exercise?.hold || 'n/a'}</p>
                    <p style="padding-top: 6pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">Exercise URL</p>
                    <p style="text-indent: 0pt;text-align: left;" />
                    <p style="padding-left: 5pt;text-indent: 0pt;text-align: left;"><a
                            href="${exercise.video_url}">${
            exercise.video_url
          }</a>
                    </p>
                    <p style="text-indent: 0pt;text-align: left;"><br /></p>`;
        })}

    </body>
    
    </html>`;
};
