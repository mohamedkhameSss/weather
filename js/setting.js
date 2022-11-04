/// <reference path="../typings/globals/jquery/index.d.ts" />
export class Setting{
    constructor(){
        this.searchBtn =document.getElementById('button-addon2')
        this.searchInput= document.getElementById('Enter')
        this.searchInput.addEventListener('keyup',this.searchData.bind(this))
        this.searchData()
    }
    api (){
        let seaValue =this.searchInput.value;
        if (seaValue.length > 2){
            seaValue =this.searchInput.value
        }else {
            seaValue ="cairo"
        }
        let Api=`http://api.weatherapi.com/v1/forecast.json?key=f07206997bc24291975232632222610&q=${seaValue}&days=3`
        return Api
    }
    async searchData()
    {   
        let response =await this.fetchApi(this.api()).finally(console.log("missed name"))
        $('#countryName').html(response.location.name)
        $('#condition').html(response.current.condition.text)
        $('#iconMain').html(`<img class="p-1" src="${response.current.condition.icon}" alt="">` )
        $('#degreeMain').html(response.current.temp_c+"c")
        $('#windMain').html(response.current.wind_kph)
        $('#dirMain').html(response.current.wind_dir)
        $('#humi').html(response.current.humidity)
        this.day().finally(console.log("miss"))
        this.nextDays().finally(console.log("miss"))
    
    }
    async day()
    {   
        
        let response =await this.fetchApi(this.api()).finally(console.log("missed name"))
        let x=response.location.localtime
        let y=parseInt(x)
        let s=x.split(' ')
        
        $('#dateMain').html(s[0])
        let dayd =
        [
            'Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saterday'
        ]
        let dated =new Date
        
        let numday=dated.getDay()
        for (let i = 0; i < dayd.length-2; i++) {
            $('#currenrday').html(dayd[numday])
            $('#day1').html(dayd[numday+1]);
            $('#daylast').html(dayd[numday-5]);
            
        }
    }
    async nextDays(){
        let response =await this.fetchApi(this.api()).finally(console.log("missed name"))
        $('#iconNext1').html(`<img  src="${response.forecast.forecastday[0].day.condition.icon}" alt="">` )
        $('#avgtemp_c').html(response.forecast.forecastday[0].day.avgtemp_c)
        $('#mintemp_c').html(response.forecast.forecastday[0].day.mintemp_c)
        $('#conditionNext1').html(response.forecast.forecastday[0].day.condition.text)
        $('#iconNext2').html(`<img  src="${response.forecast.forecastday[1].day.condition.icon}" alt="">` )
        $('#avgtemp_c2').html(response.forecast.forecastday[1].day.avgtemp_c)
        $('#mintemp_c2').html(response.forecast.forecastday[1].day.mintemp_c)
        $('#conditionNext2').html(response.forecast.forecastday[1].day.condition.text)
    
    }
    async fetchApi(Api){
        let response=await fetch(Api).finally(console.log("missed name"));
        let result =await response.json().finally("no");
                return result
        
    }
}
