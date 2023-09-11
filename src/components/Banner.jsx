import React from "react";

export default function Banner() {
  return (
    <section className="bg-spacex-blue text-black py-4 spacex-banner">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
        <div className="lg:w-1/2 h-600 lg:ml-10 text-center justify-start flex flex-col lg:text-left">
          <h1 className="text-4xl font-bold mb-2">Welcome to SpaceX</h1>
          <p className="text-lg mb-6">
            Exploring the future of space exploration and technology.
          </p>
          <div className="max-w-lg">
            <a
              href="/"
              className="bg-black hover:bg-grey text-white text-lg font-semibold px-4 py-2 rounded-full transition duration-300 transform hover:scale-105 w-full"
            >
              Explore Missions
            </a>
          </div>
        </div>
        <div className="lg:w-1/2  mt-2 sm:mt-0">
          <img
            src="https://img.freepik.com/premium-vector/spaceship-isolated-vector-illustration-white-background_225753-5032.jpg?size=626&ext=jpg&ga=GA1.2.1551550458.1693919965&semt=sph"
            alt="SpaceXImage"
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}
