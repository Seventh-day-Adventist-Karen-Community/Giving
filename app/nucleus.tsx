'use client'

import React from 'react'

export default function Nucleus() {
  return (
    <script
    dangerouslySetInnerHTML={{
        __html: `
            window.nucleusLauncherSettings = {
                launcherId: '4f9a899b71e5d56e5f05',
            };
            (function (l, a, u, n, c, h) {
                u = a.createElement('script');
                u.type = 'text/javascript';
                u.async = true;
                u.src = 'https://launcher.nucleus.church/boot.latest.js';
                n = a.getElementsByTagName('script')[0];
                n.parentNode.insertBefore(u, n);
            })(window, document);
        `
    }}
    >
    </script>
  )
}
