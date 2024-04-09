import React from 'react';
import { Icon } from 'semantic-ui-react';

const Footer = () => {
    return (
        <footer 
            style={{ 
                //position: 'fixed',
                backgroundColor: 'black', 
                color: 'white', 
                padding: '20px', 
                textAlign: 'center', 
                bottom: '0', 
                left: '0', 
                width: '100%',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', // Menambahkan shadow
                borderTop: '1px solid #333', // Menambahkan border atas
                lineHeight: '1.5', // Menambahkan line-height
            }}
        >
            <div>
                Dim5Ptr © 2024 Movie App. All rights reserved.
            </div>
        </footer>
    )
}

export default Footer;
