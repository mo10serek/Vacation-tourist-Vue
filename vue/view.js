new Vue({
    el: '#List',
    data: {
        places: ['Hawaii', 'Las Vegas', 'Los Angeles', 'Mexico']
    }
})

Vue.component('Location', { 
    props: {
        selectedlocation: {
            type: Number,
            required: true
        }
    },
    template: `
        <div class="Location">
            <div class="Location-image">
                <h3>{{ places[this.selectedlocation].name }}</h3>
                <img :src="image">
            </div>
            
            <div class="Location-details">
                <p>Location: {{ places[this.selectedlocation].location }}</p>
                <p style="text-decoration: underline; background-color: yellow" 
                   @mouseover="updatePicture(0)">day</p>
                <p style="text-decoration: underline; background-color: yellow"
                   @mouseover="updatePicture(1)">night</p>
                
                <button v-on:click="addToCart()" style="background-color: #1E95EA; color: white;"> 
                    buy ticket 
                </button>

                <p v-if="numOfTickets > 0"> tickets: {{ numOfTickets }}</p>
            </div>
            
            <div class="Location-description">
                <p>{{ places[this.selectedlocation].description }}</p>
            
            </div>
        </div>
        `,
    data() {
        return {
            selectedTime: 0,
            numOfTickets: 0,
            places: [
                {
                    name: 'Hawaii',
                    location: "North Pacific Ocean",
                    timeOfDays: [
                        {
                            id: 1,
                            image: "HawaiiDay.jpg"
                        },
                        {
                            id: 2,
                            image: "HawaiiNight.jpg"
                        }
                    ],
                    description: "The Big Island of Hawaii is always a popular destination for travelers.  Maui, Oahu and Honolulu are a few Hawaiian hot spots for relax and unwind. There is something for everyone, including sunset paddling, the Hawaii Volcanoes National Park, USS Arizona Memorial, Panaewa Rainforest Zoo, and Waimea Canyon."
                },
                {
                    name: 'Las Vegas',
                    location: "South West of United States",
                    timeOfDays: [
                        {
                            id: 3,
                            image: "VegasDay.jpg"
                        },
                        {
                            id: 4,
                            image: "VegasNight.jpg"
                        }
                    ],
                    description: "Luck can be more than a lady in Sin City. With dozens of posh hotels, casinos and a variety of buffets, Las Vegas is a definitely a top destination for tourists. Go indoor skydiving; ride a rollercoaster at the Stratosphere Hotel Casino; stroll through the Bellagio’s Botanical Gardens or race your friends in a mini kart at the Las Vegas Mini Gran Prix."
                },
                {
                    name: 'Los Angeles',
                    location: "West of United States",
                    timeOfDays: [
                        {
                            id: 5,
                            image: "AngelesDay.jpg"
                        },
                        {
                            id: 6,
                            image: "AngelesNight.jpg"
                        }
                    ],
                    description: "Beverly Hills, Sunset Boulevard, the Hollywood Walk of Fame and Universal Studios are just a few reasons why tourists flock to The City of Angels. While you are in the area, take a daytrip to Laguna Beach or Santa Monica"
                },
                {
                    name: 'Mexico',
                    location: "south of North America",
                    timeOfDays: [
                        {
                            id: 7,
                            image: "MexicoDay.jpg"
                        },
                        {
                            id: 8,
                            image: "MexicoNight.jpg"
                        }
                    ],
                    description: "Take a jungle tour; swim with the dolphins; go snorkeling in the 2nd largest reef in the world or take a Party Hopper Tour of fun pubs in Cancun, Mexico. We also recommend that you indulge in a couple relaxing days on the pristine, sandy shores of the popular destination."
                }
            ]
        }
    },
    methods: {
        addToCart: function() {
            this.$emit('updateCart')
        },
        updatePicture: function(index) {
            this.selectedTime = index
        },
        chooseLocation: function(location) {
            this.selectedLocation = location
        },
        addToCart: function() {
            this.$emit('update-cart')
            this.numOfTickets++
        }
    },
    computed: {
        image(){
            i = this.selectedlocation
            j = this.selectedTime
            return this.places[i].timeOfDays[j].image
        }
    }
})

var app = new Vue({
    el: '#app',
    data: {
        selectedlocation: 0,
        cart: 0
    },
    methods: {
        updateCart() {
            this.cart += 1
        }
    }
})

Vue.component('location-review' , {
    template: `
        <div class="review">
            <form class="review-form" @submit.prevent="onSubmit">

                <h1>Review</h1>
                <h2>Location</h2>
                <select name="location" size="4" v-model.String="location">
                    <option value="Hawaii">Hawaii</option>
                    <option value="Las Vegas">Las Vegas</option>
                    <option value="Los Angeles">Los Angeles</option>
                    <option value="Mexico">Mexico</option>
                </select><br> <br>
                <h2>Name</h2>
                <input type="text" v-model="name"><br>
                <br>
                <h2>description</h2>
                <textarea v-model="description"></textarea>
                <h2>rating</h2>
                <select name="rating" size="5" v-model.number="rating">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select><br> <br>

                <input type="submit" value="Submit" style="background-color: #1E95EA; color: white;">
            </form>
            <h3 v-if="reviews.length === 0">no reviews</h3>
            <div v-else>
                <h3> reviews </h3>
                
                <li v-for="review in reviews">
                    <h4>location: {{ review.location }}</h4>
                            
                    <h5>name: {{ review.name }} </h5>

                    <p style="width: 200px;"> {{ review.description }} </p>

                    <h5>rating: {{ review.rating }}</h5>

                </li>        
                    
            </div>
            
        </div>
    `,
    data() {
        return {
            location: "",
            name: "",
            description: "",
            rating: "",
            reviews: []
        }
    },
    methods: {
        onSubmit() {
            let locationReview = {
                location: this.location,
                name: this.name,
                description: this.description,
                rating: this.rating
                
            }
            this.location = ""
            this.name = ""
            this.description = ""
            this.rating = ""
            console.log( locationReview)
            console.log(this.name)
            console.log(this.description)
            console.log(this.rating)    
            this.reviews.push(locationReview)
        }
    }
})

var review = new Vue({
    el: '#review',
    data: {
    },
    methods: {
    }
})

