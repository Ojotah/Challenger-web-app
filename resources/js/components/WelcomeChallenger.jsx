import React from 'react';
import ReactDOM from 'react-dom/client';

function WelcomeChallenger() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header bg-dark text-white d-flex justify-content-center">Welcome to the Challenger project</div>

                        <div className="card-body  d-flex justify-content-center ">Welcome to challenger where u can challenge ur friends :)</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WelcomeChallenger;

if (document.getElementById('welcome-to-challenger')) {
    const Index = ReactDOM.createRoot(document.getElementById("welcome-to-challenger"));

    Index.render(
        <React.StrictMode>
            <WelcomeChallenger/>
        </React.StrictMode>
    )
}
