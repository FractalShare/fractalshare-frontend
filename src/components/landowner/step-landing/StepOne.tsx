'use client';

export default function StepOne() {
    return (
        <div className="max-w-7xl flex flex-col lg:flex-row items-center lg:items-center gap-20">
            <div className="flex flex-col w-1/2 items-center justify-center">
            <div>
                <p className="text-sm font-medium text-gray-700 mb-4">Step 1</p>
                <h1 className="text-3xl lg:text-4xl font-extrabold mb-6">
                    Tell us about your place
                </h1>
                <p className="text-sm text-gray-700">
                    In this step, we’ll collect the foundational information about your
                    land. You’ll tell us what type of land you’re listing, where it’s
                    located, and provide key details like acreage, zoning, and your
                    parcel number (APN). This helps us verify your property and begin
                    building your listing.
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
                <source src="/videos/cropped_step1animation.mp4" type="video/mp4" />
                Your browser does not support the video tag.
                </video>
            </div>
        </div>
    );
}