'use client';

export default function StepThree() {
    return (
        <div className="max-w-7xl flex flex-col lg:flex-row items-center lg:items-center gap-20">
            <div className="flex flex-col w-1/2 items-center justify-center">
            <div>
                <p className="text-sm font-medium text-gray-700 mb-4">Step 3</p>
                <h1 className="text-3xl lg:text-4xl font-extrabold mb-6">
                    Set Terms & Publish
                </h1>
                <p className="text-sm text-gray-700">
                    Now it’s time to finalize your listing. You’ll enter your asking price, 
                    decide how much of your land to offer for investment, and choose whether 
                    to enable resale. We’ll help you generate a great description, and 
                    then you’ll be ready to publish.
                </p>
            </div>
            </div>

            <div className="flex justify-center items-center w-1/2">
                <video
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover pointer-events-none"
                >
                <source src="/videos/cropped_step3animation.mp4" type="video/mp4" />
                Your browser does not support the video tag.
                </video>
            </div>
        </div>
    );
}