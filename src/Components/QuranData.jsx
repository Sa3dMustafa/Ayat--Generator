import React, { useEffect, useState } from "react";
import Loader from "./Loader"; // Importing the Loader component
import "./quran.css"; // Importing the CSS styles

function QuranData() {
  const [ayah, setAyah] = useState(null); // Using the state hook to store the current Ayah
  const [surah, setSurah] = useState(null); // Using the state hook to store the current Surah
  const [loader, setLoader] = useState(true); // Using the state hook to manage the loader's visibility (initially set to true)

  useEffect(() => {
    // Using the useEffect hook to fetch a random Ayah when the component mounts
    setTimeout(() => {
      fetchRandomAyah();
    }, 1500); // Adding a delay of 1.5 seconds before fetching the initial Ayah
  }, []);

  const fetchRandomAyah = () => {
    let url = "https://api.alquran.cloud/v1/quran/ar.alafasy"; // The URL to fetch a random Ayah
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const quranData = data.data; // Extracting the Quranic data from the response

        if (quranData) {
          const randomSurahIndex = Math.floor(
            Math.random() * quranData.surahs.length
          ); // Generating a random index for a Surah
          const randomAyahIndex = Math.floor(
            Math.random() * quranData.surahs[randomSurahIndex].ayahs.length
          ); // Generating a random index for an Ayah

          setLoader(false); // Hiding the loader once data is available
          const randomSurah = quranData.surahs[randomSurahIndex]; // Selecting the random Surah
          const randomAyah = randomSurah.ayahs[randomAyahIndex]; // Selecting the random Ayah

          setSurah(randomSurah); // Setting the current Surah in the state
          setAyah(randomAyah); // Setting the current Ayah in the state
        } else {
          console.error("No data available."); // Handling the case where no data is available
        }
      })
      .catch((error) => console.error("Error:", error)); // Handling errors during the fetch
  };

  const changeAyah = () => {
    setLoader(true); // Displaying the loader when changing the Ayah
    setTimeout(() => {
      setAyah(null); // Clearing the current Ayah
      fetchRandomAyah(); // Fetching and setting a new random Ayah
    }, 1000); // Adding a delay of 1 second before fetching the new Ayah
  };

  if (loader) {
    return <Loader />; // Display the Loader component if the loader state is true
  }

  return (
    <div className="random-quran">
      <h1 className="title">آيات من القرآن الكريم </h1>
      {ayah && surah && (
        <div className="container">
          <p className="Ayah">{ayah.text}</p>
          <p className="Ayah-name">اسم السورة: {surah.name}</p>
          <p className="place">
            مكان نزول السورة :{" "}
            {surah.revelationType === "Meccan" ? "مكية" : "مدنية"}
          </p>
          <p className="Ayah-number">رقم الآية: {ayah.numberInSurah}</p>
          <button onClick={changeAyah}>تغيير الآية</button>
          <audio controls>
            <source src={ayah.audio} type="audio/mp3" />
          </audio>
        </div>
      )}
    </div>
  );
}

export default QuranData;
