import React from "react";

function Section({ id, title, children, reference }) {
    return (
        <section
            id={id}
            ref={reference}
            className="mb-5 pb-5 animate-fade-in position-relative"
            style={{ scrollMarginTop: "80px" }}
        >
            <div className="position-absolute d-none d-md-block" style={{
                width: '150px',
                height: '150px',
                background: 'var(--primary)',
                opacity: '0.03',
                borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                top: '10px',
                right: '-30px',
                zIndex: '-1',
                transform: 'rotate(15deg)'
            }}></div>
            
            <h2 className="display-6 fw-bold mb-4 position-relative">
                {title}
                <span className="position-absolute d-none d-md-inline-block" style={{
                    fontSize: '0.5em',
                    color: 'var(--accent)',
                    opacity: '0.3',
                    right: '-20px',
                    bottom: '5px',
                    fontWeight: '300'
                }}>•</span>
            </h2>
            
            <div className="mb-4 position-relative">
                {children}
            </div>
            
            <div className="position-absolute d-none d-lg-block" style={{
                width: '80px',
                height: '80px',
                background: 'var(--accent)',
                opacity: '0.05',
                borderRadius: '50%',
                bottom: '40px',
                left: '-40px',
                zIndex: '-1'
            }}></div>
        </section>
    );
}

export default Section;
