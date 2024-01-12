import logo from "./logo.svg";
import "./App.css";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

export default function App() {
  const [Data, setData] = useState([]);
  const [main, setMain] = useState(true);
  const [countryNumber, setNumber] = useState(0);
  const [otherCountryNumberse, settOther] = useState([]);
  const [searchedCountry, setSearchedCountry] = useState("");
  const [inputValue, setValue] = useState("");
  const [isGameTrue, setGame] = useState(false);
  const [startGame, setStart] = useState(false);
  const [currentCountry, setCurrentCountry] = useState("");
  const [score, setScore] = useState(0);
  const [end, setEnd] = useState(false);
  const [typeChoosen, setType] = useState("");
  const [textType,setTextType] = useState("")
  const link = "https://restcountries.com/v3.1/all";
  const excludedIndices = [78, 243];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const datafetched = await fetch(link);
        const country = await datafetched.json();
        setData(country);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (Data.length >= 1) {
      generateNumber();
    }
  }, [Data]);

  const generateNumber = () => {
    setNumber((prevNumber) => {
      const number = Math.floor(Math.random() * Data.length);

      return number;
    });
    console.log(Data[countryNumber]);
  };

  const nextCountry = () => {
    generateNumber();
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // console.log(entry);
      if (entry.isIntersecting) {
        // console.log(1);
        // entry.target.classList.remove('hid')
        entry.target.classList.add("show");
        // observer.unobserve(entry.target)
      } else {
        // console.log(0);
        entry.target.classList.remove("show");
        // entry.target.classList.add('hid')
      }
    });
  });
  const hiddenElements = document.querySelectorAll(".hid");
  hiddenElements.forEach((el) => {
    observer.observe(el);
    // console.log(el);
  });
  const searchedcountryfunc = () => {
    const foundCountry = Data.find(
      (x) => x.name.common.toUpperCase() === inputValue.toUpperCase()
    );

    if (foundCountry) {
      setSearchedCountry(foundCountry);
    } else {
      // If the country is not found, you might want to handle this case
      setSearchedCountry(null);
    }
  };
  const generateRandomNumbers = () => {
    const correctCountryIndex = Math.floor(Math.random() * Data.length);
    setCurrentCountry(correctCountryIndex);
    const newRandomNumbers = [correctCountryIndex];

    while (newRandomNumbers.length < 4) {
      const randomIndex = Math.floor(Math.random() * Data.length);
      if (!newRandomNumbers.includes(randomIndex)) {
        newRandomNumbers.push(randomIndex);
      }
    }

    newRandomNumbers.sort(() => Math.random() - 0.5);
    settOther(newRandomNumbers);
  };
  const checkCountry = (e) => {
    const value = e.target.value;
    if (Data[currentCountry].name.common === value) {
      setScore(score + 1);
      // alert("true")
      generateRandomNumbers();
      if (score == 4) {
        Swal.fire("hmmm you're good");
      }
      if (score == 9) {
        Swal.fire("Great Job...");
      }
      if (score == 9) {
        Swal.fire("So You're Expert at that");
      }
      if (score == 19) {
        Swal.fire("YOU'RE A CHAMPIOOON");
        setStart(true);
        setEnd(true);
        setScore(0);
      }
    } else {
      Swal.fire("false");
    }
  };
  return (
    <div className="App">
      {main && (
        <>
          {!isGameTrue && (
            <>
              {Data.length >= 1 && (
                <div className="text-center flex flex-col justify-center hid">
                  <div className="text-center flex flex-col justify-center items-center">
                    <img
                      src={Data[countryNumber].flags.png}
                      alt=""
                      className="w-[85%] border-4 border-white rounded-md m-[10%] h-[220px] md:w-[50%] md:h-[290px] md:m-[5%] lg:w-[30%] lg:m-[2%] items-center"
                    />
                  </div>

                  <div className="flex flex-col text-center">
                    <div className="mb-4">
                      <h1 className="text-blue-500 text-2xl font-bold">
                        COUNTRY :
                      </h1>
                      <h1 className="text-2xl font-bold text-white">
                        {/* {console.log(Data.findIndex((x)=>x.name.common === "Israel"))} */}

                        {Data[countryNumber].name.common}
                      </h1>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-lg text-blue-500">CAPITAL :</h4>
                      <h4 className="text-lg text-white">
                        {Data[countryNumber].capital}
                      </h4>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-lg text-blue-500">POPULATION :</h4>
                      <p className="text-base text-white">
                        {Data[countryNumber].population}
                      </p>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-lg text-blue-500">REGION :</h4>
                      <p className="text-base text-white">
                        {Data[countryNumber].region}
                      </p>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-lg text-blue-500">SUB REGION :</h4>
                      <p className="text-base text-white">
                        {Data[countryNumber].subregion}
                      </p>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-lg text-blue-500">TIME ZONE :</h4>
                      <p className="text-base text-white">
                        {Data[countryNumber].timezones}
                      </p>
                    </div>
                  </div>

                  <div className="items-center">
                    <button
                      onClick={nextCountry}
                      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md w-[40%] md:w-[30%] lg:w-[20%] "
                    >
                      DISCOVER
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          <div>
            <div className="mt-[45%] sm:mt-[35%] md:mt-[24%] hid">
              <h1 className="text-white text-2xl font-bold">
                SEARCH FOR A COUNTRY :
              </h1>
              <input
                type="text"
                onChange={(e) => setValue(e.target.value)}
                placeholder={"SEARCH COUNTRY"}
                className="w-[70%] h-[45px] rounded-lg mt-[5%] text-center"
              />
              <div className="flex flex-col justify-center items-center">
                <button
                  onClick={searchedcountryfunc}
                  className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md w-[40%] md:w-[30%] lg:w-[20%] mb-[20%]"
                >
                  SEARCH
                </button>
                <div className="mt-[5%] sm:mt-[5%] md:mt-[5%] hid">
                  {searchedCountry && (
                    <div className="text-center flex flex-col justify-center mb-[14%]">
                      <div className="text-center flex flex-col justify-center items-center">
                        <img
                          src={searchedCountry.flags.png}
                          alt=""
                          className="w-[85%] border-4 border-white rounded-md m-[10%] h-[220px] md:w-[130%] md:m-[5%] lg:w-[100%] lg:m-[2%] items-center"
                        />
                      </div>

                      <div className="flex flex-col text-center">
                        <div className="mb-4">
                          <h1 className="text-blue-500 text-2xl font-bold">
                            COUNTRY :
                          </h1>
                          <h1 className="text-2xl font-bold text-white">
                            {searchedCountry.name.common}
                          </h1>
                        </div>

                        <div className="mb-4">
                          <h4 className="text-lg text-blue-500">CAPITAL :</h4>
                          <h4 className="text-lg text-white">
                            {searchedCountry.capital}
                          </h4>
                        </div>

                        <div className="mb-4">
                          <h4 className="text-lg text-blue-500">
                            POPULATION :
                          </h4>
                          <p className="text-base text-white">
                            {searchedCountry.population}
                          </p>
                        </div>

                        <div className="mb-4">
                          <h4 className="text-lg text-blue-500">REGION :</h4>
                          <p className="text-base text-white">
                            {searchedCountry.region}
                          </p>
                        </div>

                        <div className="mb-4">
                          <h4 className="text-lg text-blue-500">
                            SUB REGION :
                          </h4>
                          <p className="text-base text-white">
                            {searchedCountry.subregion}
                          </p>
                        </div>

                        <div className="mb-4">
                          <h4 className="text-lg text-blue-500">TIME ZONE :</h4>
                          <p className="text-base text-white">
                            {searchedCountry.timezones}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <h1 className="text-white text-2xl font-bold">OR :</h1>
                <button
                  onClick={() => {
                    setGame(true);
                    setMain(false);
                  }}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md w-[40%] md:w-[30%] lg:w-[20%] mb-[20%]"
                >
                  TEST YOURSELF
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      {isGameTrue && (
        <>
          {!startGame && (
            <div className="mt-[15%] lg:mt-[3%]">
              <h1 className="text-white text-2xl font-bold">
                You Want To Test Yourself ?
                <br /> Choose You're type :
              </h1>
              <div className="flex flex-col justify-center items-center">
                <div className="image-container mt-[25%] mb-[15%] md:mt-[3%] md:mb-[5%]">
                  <img
                    id="pic1"
                    src="./flags.jpg"
                    onClick={() => {
                      setType("flags");
                      setTextType("Flag");
                      setStart(true);
                      generateRandomNumbers();
                    }}
                    alt="flags"
                    className="zoom-out w-[60%]   rounded-xl cursor-pointer lg:w-[20%] md:w-[40%]"
                  />
                  <div className="image-text" id="text1">
                    Play With Flags !
                  </div>
                </div>

                <div className="image-container">
                  <img
                    id="pic2"
                    src="./capital.jpg"
                    onClick={() => {
                      setType("capital");
                      setTextType("Capital");
                      setStart(true);
                      generateRandomNumbers();
                    }}
                    alt="capitals"
                    className="zoom-out w-[60%] rounded-xl cursor-pointer lg:w-[20%]  md:w-[40%]"
                  />
                  <div className="image-text" id="text2">
                    Play With Capitals !
                  </div>
                </div>
              </div>
            </div>
          )}
          {startGame && !end && (
            <>
              <div className="mt-[10%] flex flex-col items-center md:mt-[2%]">
                <h1 className="text-white text-2xl font-bold text-center">
                  This is the {textType} of any country ?
                </h1>

                {typeChoosen === "capital" && (
                  <h1 className=" mt-[5%] text-2xl  font-bold bg-white  text-blue-500 px-4 py-2 rounded-md  w-[40%] md:w-[30%] lg:w-[20%] mb-[8%] md:ml-[0%]">
                    {Data[currentCountry].capital}
                  </h1>
                )}
                {typeChoosen === "flags" && (
                  <img 
                  src={Data[currentCountry].flags.png}
                  className=" mt-[5%]  px-4 py-2 rounded-md  w-[40%] md:w-[30%] lg:w-[20%] mb-[8%] md:ml-[0%]">
                    
                  </img>
                )}
              </div>

              <div className=" mt-[2%] flex flex-col items-center md:flex-row md:justify-around">
                {otherCountryNumberse.map((index) => (
                  <button
                    key={index}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md w-[30%] mb-[8%] md:w-[20%]"
                    onClick={checkCountry}
                    value={Data[index].name.common}
                  >
                    {Data[index].name.common}
                  </button>
                ))}
              </div>
              <div className=" mt-[2%] flex flex-col items-center md:flex-row md:justify-around ">
                <h1 className="text-white text-2xl font-bold text-center ">
                  Your Score :
                </h1>
                <h1 className="bg-blue-500 text-white px-4 py-2 rounded-md mt-[3%] md:mt-[0%]">
                  {score}
                </h1>
              </div>
              <button
                onClick={() => {
                  window.location.reload();
                }}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md w-[40%] md:w-[30%] lg:w-[20%] mb-[20%]"
              >
                End
              </button>
            </>
          )}
          {end && (
            <>
              <div className="items-center mt-[50%] md:mt-[17%]">
                <h1 className="text-white text-2xl font-bold text-center">
                  You want to Try again ?
                </h1>
                <div className="flex flex-col md:flex-col items-center">
                  <button
                    onClick={() => {
                      setEnd(false);
                      setGame(true);
                      setMain(false);
                      // setStart(true);
                      generateNumber();
                    }}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md w-[40%] md:w-[30%] lg:w-[20%] mb-[5%]"
                  >
                    Play Again
                  </button>
                  <h1 className="text-white text-2xl font-bold text-center">
                    OR :
                  </h1>

                  <button
                    onClick={() => {
                      window.location.reload();
                    }}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md w-[40%] md:w-[30%] lg:w-[20%] mb-[20%]"
                  >
                    End
                  </button>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
