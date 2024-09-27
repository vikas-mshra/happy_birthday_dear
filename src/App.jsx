import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [timeDifference, setTimeDifference] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isPlaying, setIsPlaying] = useState({
    birthday: false,
    khoobsurat: false,
    baatein: false,
  });

  const [wish, setWish] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const birthdayMusicRef = useRef(null);
  const khoobsuratMusicRef = useRef(null);
  const baateinMusicRef = useRef(null);

  // Function to calculate the time difference
  const calculateTimeDifference = () => {
    const targetDate = new Date("2017-08-24T00:00:00"); // Target Date (24 Aug 2017)
    const currentDate = new Date(); // Current Date

    const totalSeconds = Math.floor((currentDate - targetDate) / 1000);

    // Calculate years, months, days, hours, minutes, seconds
    const years = Math.floor(totalSeconds / (365 * 24 * 60 * 60));
    const remainingAfterYears = totalSeconds % (365 * 24 * 60 * 60);

    const months = Math.floor(remainingAfterYears / (30 * 24 * 60 * 60));
    const remainingAfterMonths = remainingAfterYears % (30 * 24 * 60 * 60);

    const days = Math.floor(remainingAfterMonths / (24 * 60 * 60));
    const remainingAfterDays = remainingAfterMonths % (24 * 60 * 60);

    const hours = Math.floor(remainingAfterDays / (60 * 60));
    const remainingAfterHours = remainingAfterDays % (60 * 60);

    const minutes = Math.floor(remainingAfterHours / 60);
    const seconds = remainingAfterHours % 60;

    setTimeDifference({
      years,
      months,
      days,
      hours,
      minutes,
      seconds,
    });
  };

  const sendWish = () => {
    setIsLoading(true);
    async function sendEmail() {
      console.log("sending mail");
      setIsLoading(false);
      setIsEmailSent(true);
    }
    sendEmail();
  };

  const toggleBirthdayPlay = () => {
    if (birthdayMusicRef.current) {
      if (isPlaying?.birthday) {
        birthdayMusicRef.current.pause();
      } else {
        birthdayMusicRef.current.play().catch((error) => {
          console.error("Playback failed:", error);
        });
        if (isPlaying?.baatein) baateinMusicRef.current.pause();
        if (isPlaying?.khoobsurat) khoobsuratMusicRef.current.pause();
      }
      setIsPlaying((prevState) => ({
        baatein: false,
        khoobsurat: false,
        birthday: !prevState.birthday,
      }));
    }
  };

  const toggleKhoobsuratPlay = () => {
    if (khoobsuratMusicRef.current) {
      if (isPlaying?.khoobsurat) {
        khoobsuratMusicRef.current.pause();
      } else {
        khoobsuratMusicRef.current.play().catch((error) => {
          console.error("Playback failed:", error);
        });
        if (isPlaying?.baatein) baateinMusicRef.current.pause();
        if (isPlaying?.birthday) birthdayMusicRef.current.pause();
      }
      setIsPlaying((prevState) => ({
        birthday: false,
        baatein: false,
        khoobsurat: !prevState.khoobsurat,
      }));
    }
  };

  const toggleBaateinPlay = () => {
    if (baateinMusicRef.current) {
      if (isPlaying?.baatein) {
        baateinMusicRef.current.pause();
      } else {
        baateinMusicRef.current.play().catch((error) => {
          console.error("Playback failed:", error);
        });
        if (isPlaying?.khoobsurat) khoobsuratMusicRef.current.pause();
        if (isPlaying?.birthday) birthdayMusicRef.current.pause();
      }
      setIsPlaying((prevState) => ({
        birthday: false,
        khoobsurat: false,
        baatein: !prevState.baatein,
      }));
    }
  };

  // Use useEffect to set an interval that updates every second
  useEffect(() => {
    const interval = setInterval(() => {
      calculateTimeDifference();
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);
  return (
    <div>
      <audio ref={birthdayMusicRef} loop>
        <source src="music.mp3" type="audio/mpeg" />
      </audio>
      <audio ref={khoobsuratMusicRef} loop>
        <source src="Khoobsurat.mp3" type="audio/mpeg" />
      </audio>
      <audio ref={baateinMusicRef} loop>
        <source src="Baatein.mp3" type="audio/mpeg" />
      </audio>
      <section
        className="flex flex-col items-center justify-center p-6 md:p-10 gap-y-6 w-full min-h-[100vh]
      bg-gradient-to-b from-white via-white to-orange-100"
      >
        <h1 className="text-lg md:text-2xl font-bold text-center">
          [ANY WELCOME MESSAGE]
        </h1>
        <img
          src="/images/welcome_face.jpeg"
          alt=""
          className="h-[300px] w-[300px] md:h-[800px] md:w-[800px] border-solid border-2 border-white rounded-full"
        />
      </section>

      <section
        className="flex flex-col justify-center items-center text-center p-6 md:p-10 gap-y-6 w-full min-h-[100vh]
      bg-gradient-to-b from-orange-100 via-white to-pink-200"
      >
        <h1 className="text-5xl md:text-9xl font-bold">HAPPY BIRTHDAY 🎂</h1>
        <p className="text-lg md:text-2xl text-black">
          Dear&nbsp;
          <span className="text-sm">you can put some short message here</span>
        </p>
        <img
          src="/images/celebration_face.jpeg"
          alt=""
          className="h-[100px] w-[100px] md:h-[200px] md:w-[200px] border-solid border-2 border-white rounded-full"
        />
        <p className="text-sm md:text-xl text-black">
          I created this website 💻 just to wish you like no other has done
          before and make you feel special because you are sooooo special 👧
        </p>
      </section>

      <section
        className="flex flex-col justify-center p-6 md:p-10 gap-y-6 w-full min-h-[100vh]
      bg-gradient-to-b from-pink-200 via-orange-200 to-red-300"
      >
        <p className="text-lg md:text-2xl">
          It's been exactly
          <h1 className="text-5xl md:text-7xl font-bold text-white">
            {`${
              timeDifference.years > 0
                ? `${timeDifference.years} Year${
                    timeDifference.years > 1 ? "s" : ""
                  } `
                : ""
            }
  ${
    timeDifference.months > 0
      ? `${timeDifference.months} Month${timeDifference.months > 1 ? "s" : ""} `
      : ""
  }
  ${
    timeDifference.days > 0
      ? `${timeDifference.days} Day${timeDifference.days > 1 ? "s" : ""} `
      : ""
  }
  ${
    timeDifference.hours > 0
      ? `${timeDifference.hours} Hour${timeDifference.hours > 1 ? "s" : ""} `
      : ""
  }
  ${
    timeDifference.minutes > 0
      ? `${timeDifference.minutes} Minute${
          timeDifference.minutes > 1 ? "s" : ""
        } `
      : ""
  }
  ${
    timeDifference.seconds > 0
      ? `${timeDifference.seconds} Second${
          timeDifference.seconds > 1 ? "s" : ""
        }`
      : ""
  }`}
          </h1>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          convallis tempor felis quis tempus. Curabitur semper consectetur quam.
          Nullam rutrum venenatis arcu, vel suscipit sapien vulputate in.
          Phasellus eu odio ac est venenatis dictum. Phasellus sagittis tempus
          pellentesque. Morbi quis nibh scelerisque augue eleifend mollis eget a
          neque. Sed congue purus scelerisque lectus finibus porttitor. Aenean
          in erat felis. Phasellus vestibulum dui id blandit pretium. Aenean
          blandit dui et maximus fringilla. Etiam non convallis odio, ac
          molestie erat. Mauris ac sapien dictum, pharetra nulla et, scelerisque
          neque. Curabitur cursus ultrices varius. Fusce non massa ex. Quisque
          dapibus, libero sed aliquet fringilla, justo erat accumsan tellus,
          dictum dignissim ex orci ut nunc. Morbi mattis sapien porta enim
          fermentum convallis. Praesent in tellus finibus, cursus orci non,
          semper urna. Nulla vitae nisi leo. Maecenas bibendum tristique orci
          eget consequat. Nulla mattis faucibus dignissim. Sed tempor luctus
          elit at lobortis.&nbsp;
          <span
            className="underline cursor-pointer"
            onClick={toggleKhoobsuratPlay}
          >
            A Song for you
          </span>
        </p>
      </section>

      <section
        className="flex flex-col text-center justify-center items-center p-6 md:p-[50px] gap-y-6 w-full min-h-[100vh]
      bg-gradient-to-b from-red-300 via-red-200 to-orange-300"
      >
        <h1 className="text-xl md:text-2xl font-bold">
          I have bring the best cake in town you will ever find, just for you!
          Blow the candle and{" "}
          <span
            className="underline cursor-pointer"
            onClick={toggleBirthdayPlay}
          >
            make a wish
          </span>{" "}
          [HER_NAME]....It's your birthday
        </h1>
        {isPlaying?.birthday && (
          <div className="flex flex-col items-center">
            {isEmailSent ? (
              <p className="text-lg md:text-xl">
                Your birthday wish is on its way! Trust that the universe is
                already working on it—just give it a little time.
              </p>
            ) : (
              <>
                <textarea
                  placeholder="Make a wish [HER_NAME], whatever you want and god will grant it"
                  value={wish}
                  onChange={(event) => setWish(event.target.value)}
                  className="h-[80px] w-[300px] md:w-[400px] box-border rounded bg-[#f8f8f8] text-base resize-none px-5 py-3 border-2 border-solid border-[#ccc]"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  onClick={sendWish}
                  className="mt-2 w-[100px] box-border rounded bg-[#f8f8f8] border-2 border-solid border-[#ccc]"
                >
                  {!isLoading ? "Send Wish" : "Sending..."}
                </button>
              </>
            )}
          </div>
        )}
        <img
          src="/images/cake_with_candle.gif"
          alt=""
          className="h-[250px] w-[200px] md:h-[500px] md:w-[400px] border-solid border-2 border-orange-300 rounded-[100px]"
        />
      </section>

      <section
        className={`flex flex-col items-center justify-center text-center p-6 md:p-10 gap-y-6 w-full min-h-[100vh]
      bg-gradient-to-b from-orange-300 via-red-200 ${
        isPlaying?.baatein ? "to-white" : "to-red-300"
      }`}
      >
        <p className="text-sm md:text-2xl text-white text-justify w-full max-w-[1000px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          tristique non neque vitae malesuada. Donec id est ante. Morbi finibus
          mattis ex in dictum. Nunc sed dolor viverra, euismod nulla vitae,
          ultricies massa. Suspendisse sit amet turpis vitae ex congue posuere.
          Aenean facilisis dictum pulvinar. Pellentesque pharetra tristique
          mattis. Nullam commodo posuere varius. Suspendisse potenti. Aliquam ac
          laoreet ipsum.
        </p>
        <p className="text-sm md:text-2xl text-white text-justify w-full max-w-[1000px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          tristique non neque vitae malesuada. Donec id est ante. Morbi finibus
          mattis ex in dictum. Nunc sed dolor viverra, euismod nulla vitae,
          ultricies massa. Suspendisse sit amet turpis vitae ex congue posuere.
          Aenean facilisis dictum pulvinar. Pellentesque pharetra tristique
          mattis. Nullam commodo posuere varius. Suspendisse potenti. Aliquam ac
          laoreet ipsum.
          <span
            className="cursor-pointer underline"
            onClick={toggleBaateinPlay}
          >
            Bye
          </span>{" "}
          [HER_NAME]
        </p>
        <p className="text-lg">- Vikas</p>
        {isPlaying?.baatein && (
          <img
            src="/images/bye.jpg"
            alt=""
            className="h-[250px] w-[200px] md:h-[500px] md:w-[400px] border-solid border-2 border-white rounded-[100px]"
          />
        )}
      </section>
    </div>
  );
}

export default App;
