'use client';

export default function StepTwo() {
    return (
        <div className="max-w-7xl flex flex-col lg:flex-row items-center lg:items-center gap-20">
            <div className="flex flex-col w-1/2 items-center justify-center">
            <div>
                <p className="text-sm font-medium text-gray-700 mb-4">Step 2</p>
                <h1 className="text-3xl lg:text-4xl font-extrabold mb-6">
                    Upload & Verify
                </h1>
                <p className="text-sm text-gray-700">
                    In this step, you’ll upload documents and images to verify your ownership and 
                    the authenticity of the land. We’ll ask for photos, legal documents, 
                    and proof of identity to ensure your listing is accurate, trustworthy, and secure.
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
                <source src="/videos/cropped_step2animation.mp4" type="video/mp4" />
                Your browser does not support the video tag.
                </video>
            </div>
        </div>
    );
}