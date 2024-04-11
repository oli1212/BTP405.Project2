import React from 'react';
import { Container } from 'react-bootstrap';

export default function Footer() {
    const fakeLinks = [
        { id: 1, title: 'Link 1', url: '/link1' },
        { id: 2, title: 'Link 2', url: '/link2' },
        { id: 3, title: 'Link 3', url: '/link3' },
      ];
    return (
        <Container>
            <br /><br /><br />
            <footer className='footer'>
                <div className="footer-content">
                    <ul className="footer-links">
                        {fakeLinks.map((link) => (
                            <li key={link.id}>
                            <a href={link.url}>{link.title}</a>
                            </li>
                        ))}
                    </ul>
                    <div className="footer-info">
                        {/* Your footer information */}
                        This is a simple footer with some fake links.
                    </div>
                </div>
            </footer>
        </Container>
    );
}
