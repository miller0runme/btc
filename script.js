function updateBitcoinPrice() {
    fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
        .then(response => response.json())
        .then(data => {
            const btcPrice = data.bpi.USD.rate;
            const updateTime = new Date(data.time.updated);
            const formattedTime = `${updateTime.toLocaleDateString()} ${updateTime.toLocaleTimeString()}`;
            
            const btcPriceElement = document.getElementById("btcPrice");
            const lastUpdatedElement = document.getElementById("lastUpdated");
            const currentTimeElement = document.getElementById("currentTime");

            btcPriceElement.style.transition = "color 1s";
            btcPriceElement.style.color = "red";

            setTimeout(() => {
                btcPriceElement.textContent = `1 BTC = $${btcPrice}`;
                btcPriceElement.style.color = "green";

                const colors = ['#FFC0CB', '#ADD8E6', '#90EE90', '#FFD700', '#FFA07A', '#BA55D3', '#AFEEEE'];
                const randomColor = () => colors[Math.floor(Math.random() * colors.length)];

                const dateParts = formattedTime.split(' ');

                let formattedDate = '';
                dateParts[0].split('/').forEach(part => {
                    formattedDate += `<span style="color: ${randomColor()}">${part}</span>/`;
                });
                formattedDate = formattedDate.slice(0, -1) + ' | ';

                dateParts[1].split(':').forEach((part, index) => {
                    formattedDate += `<span style="color: ${randomColor()}">${part}</span>`;
                    if (index < dateParts[1].split(':').length - 1) {
                        formattedDate += ':';
                    }
                });

                lastUpdatedElement.innerHTML = `Последнее обновление: ${formattedDate}`;

                // Отображение текущего времени голубым цветом
                const currentTime = new Date();
                const currentTimeString = currentTime.toLocaleTimeString();
                currentTimeElement.innerHTML = `Текущее время: <span style="color: #00BFFF">${currentTimeString}</span>`;
            }, 3000);
        })
        .catch(error => console.error("Ошибка при получении данных:", error));
}

setInterval(updateBitcoinPrice, 0760);

