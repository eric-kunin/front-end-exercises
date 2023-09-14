const gameContainer = document.querySelector(".container"),
userResult = document.querySelector(".user_result img"),
cpuResult = document.querySelector(".cpu_result img"),
result = document.querySelector(".result"),
optionImages = document.querySelectorAll(".option_image");
// console.log(gameContainer,userResult,cpuResult,result,optionImages);
// Loop through each option image element
optionImages.forEach((image, index) => {
    image.addEventListener("click", (e) => {
        image.classList.add("active");

        userResult.src = cpuResult.src = "./img/rock.png";
        result.textContent = "Wait...";

        // Loop through each option image agian
        optionImages.forEach((image2,index2) => {
            // If the current index doesn't match the clicked index
            // Remove the "active" class from the other option images
            // console.log(index,index2);
            index !== index2 && image2.classList.remove("active");
        });

        gameContainer.classList.add("start");
        
        // Set a timeout to delay the result calculation
        let time = setTimeout(() => {
        gameContainer.classList.remove("start");
        // Get the source of the clicked option image 
        let imageSrc = e.target.querySelector("img").src;
        // Set the user image to the clicked option image
        userResult.src = imageSrc;
        // console.log(imageSrc);
        // Generate a random number between 0 and 2
        let randomNumber = Math.floor(Math.random() * 3);
        // console.log(randomNumber);
        let cputImages = ["./img/rock.png","./img/paper.png","./img/scissors.png"];
        // Set the CPU image to random option from the array
        cpuResult.src = cputImages[randomNumber];

        // Assign a letter value to the CPU option (R for rock, P for paper, S for scissors)
        let cpuValue = ["R","P","S"][randomNumber];
        // Assign a letter value to the clicked option (based on index)
        let userValue = ["R","P","S"][index];

        // Create an object with all possible outcomes
        let outcomes = {
            RR: "Draw",
            RP: "Computer",
            RS: "You",
            PP: "Draw",
            PR: "You",
            PS: "Computer",
            SS: "Draw",
            SR: "Computer",
            SP: "You",
        };

        // Look up the outcome value based on user and CPU options
        let outComeValue = outcomes[userValue + cpuValue];

        // Display the result
        result.textContent = userValue === cpuValue ? "Match Draw" : `${outComeValue} Won!!`;
        // console.log(outComeValue);
        },2500)
    });
});