import dayjs from "dayjs";

function Film(id, title, favorites = false, date, rating ) {
    this.id = id;
    this.title = title;
    this.favorites = favorites;
    this.date = date ?? null;
    this.rating = rating ?? null;

    this.toString = () => `ID: ${this.id} Title: ${this.title} Favorite: ${this.favorites} Watch Date: ${this.date ? this.date.format("YYYY-MM-DD") : "Unwatched"} Rating: ${this.rating ? this.rating : "Unrated"}`;
}

function FilmLibrary(films) {
    this.films = films ?? [];

    this.addNewFilm = function (film) {
        this.films.push(film);
    }

    this.sortByDate = function() {
        return [...this.films].sort((a,b) => {
            if(a.date && !b.date) return -1;
            if(!a.date && b.date) return 1;
            if(!a.date && !b.date) return 0;
            return a.date.diff(b.date);
        });
    }

    this.favoriteFilms = function() {
        return [...this.films].filter( item => item.favorites );
    }

    this.deleteFilm = function(id) {
        this.films = this.films.filter( item => item.id != id );
    }

    this.resetWatchedFilms = function() {
        this.films = this.films.forEach(item => item.date = null );
    }

    this.getRated = function() {
        return [...this.films].sort((a,b) => b.rating-a.rating);
    }

    this.seenLastMonth = function() {
        let now = dayjs();
        return [...this.films].filter( item => {
            if( item.date != null && item.date.diff(now, "months") >= 0)
                return 1;
            return 0;
        });
    }

    this.unseen = function() {
        return [...this.films].filter( item => item.date == null );
    }

    this.setRating = function(id, rating) {
        this.films.forEach( film => {
           if(film.id == id) film.rating = rating;
        });
    }

    this.setFavorite = function(id, favorite) {
        console.log(id);
        this.films.forEach( film => {
            if(film.id == id) {
                film.favorites = favorite;
                console.log(film);
            }
        });
    }

    this.toString = () => this.films.reduce((acc, curr) => acc + curr + "\n", "");

}

const filmLibrary = new FilmLibrary();

filmLibrary.addNewFilm(new Film(1, "Pulp Fiction", true, dayjs("2023-03-10"), 5));
filmLibrary.addNewFilm(new Film(2, "21 Grams", true, dayjs("2023-01-17"), 4));
filmLibrary.addNewFilm(new Film(3, "Star Wars", false));
filmLibrary.addNewFilm(new Film(4, "Matrix", false));
filmLibrary.addNewFilm(new Film(5, "Shrek", false, dayjs("2023-03-21"), 3));

export default filmLibrary

