const container = document.querySelector('.container');
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const select = document.getElementById('movie');
//seat classına sahip olan bütün elemanları seççmek için yazılan kod - not ile reserved(yani dolu koltukları) olanları dahil etmedik
const seats = document.querySelectorAll('.seat:not(.reserved)');

getFromLocalStorage();
calculateTotal();


//koltukları seçmek için yazdığımız event
container.addEventListener('click', function(e){

    if(e.target.classList.contains('seat') && !e.target.classList.contains('reserved')){       
        e.target.classList.toggle('selected');
        calculateTotal();
    }
                                                  
});
//filmi değiştirince toplam fiyat bilgisinin değişmesini sağladık (change)
select.addEventListener('change', function(e){
    calculateTotal();
})
//seçtiğimiz koltuğunun classını selected olarak değiştirme
function calculateTotal(){
    const selectedSeats = container.querySelectorAll('.seat.selected');

    const selectedSeatsArr = [];
    const seatsArr = [];

    //seçili koltukları selectedSeatsArr dizisine eklemek
    selectedSeats.forEach(function(seat) {
        selectedSeatsArr.push(seat);
    })

    seats.forEach(function(seat) {
        seatsArr.push(seat);
    })

    // local storage içerisinde saklıcağımız index listesini oluşturalım
    //map metodu ile bütün seat dizimizi dolaşıcaz ve oluşturduğumuz her bir eleman seat içerisine kopyalanacak
    //ulaştığımız elemanlar seatArr dizisi içinde kaçıncı eleman olarak tutuluyor buna ulaşıcaz ("index of" kullanırız)
    //bulduğumuz indexler selectedSeatsIndexs içinde tutulacak
    //kısaca ---> seatlar arasında selected olanların indexlerini tutma işlemi yaptık 
    let selectedSeatsIndexs = selectedSeatsArr.map(function(seat){
        return seatsArr.indexOf(seat);
    });
    //seçilen koltuk sayısını bulma - koltuk sayısını ve fiyatı koltuk seçtikçe değiştirmek
    let selectedSeatCount = selectedSeats.length;
    count.innerText = selectedSeatCount;     
    amount.innerText = selectedSeatCount * select.value;

    //local storage oluşturma  ***
    saveToLocalStorage(selectedSeatsIndexs);
}
function getFromLocalStorage() {
    //koltukları seçtikten sonra sayfa yenilense de koltukların seçili kalması
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if(selectedSeats != null && selectedSeats.length > 0){
        seats.forEach(function(seat, index){
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        });
    }

    //filmi seçtikten sonra sayfa yenilense film seçili kalır
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndexs');

    if(selectedMovieIndex != null) {
        select.selectedIndex = selectedMovieIndex;
    }
}




//local storage oluşturma  *******
function saveToLocalStorage(indexs) {
    localStorage.setItem('selectedSeats', JSON.stringify(indexs));               //koltuklar için kayıt
    localStorage.setItem('selectedMovieIndexs', select.selectedIndex);           //seçilen filmin kaydedilmesi için 
}









































