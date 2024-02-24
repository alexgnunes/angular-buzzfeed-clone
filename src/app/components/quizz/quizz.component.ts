import { Component, OnInit } from "@angular/core";
import quizz_questions from "../../../assets/data/quizz_questions.json";
import { PokeApiService } from "src/app/sevices/poke-api.service";

@Component({
  selector: "app-quizz",
  templateUrl: "./quizz.component.html",
  styleUrls: ["./quizz.component.css"],
})
export class QuizzComponent implements OnInit {
  title: string = "";
  questions: any;
  questionSelected: any;
  answers: string[] = [];
  answerSelected: string = "";
  imgIndex: any;
  image: any;

  questionIndex: number = 0;
  questionMaxIndex: number = 0;

  finished: boolean = false;

  constructor(private pokeApi: PokeApiService) {}

  ngOnInit(): void {
    if (quizz_questions) {
      this.finished = false;
      this.title = quizz_questions.title;
      this.questions = quizz_questions.questions;
      this.questionSelected = this.questions[this.questionIndex];
      this.questionIndex = 0;
      this.questionMaxIndex = this.questions.length;
    }
  }

  buttonPress(valor: string) {
    this.answers.push(valor);
    this.nextStep();
  }

  nextStep() {
    this.questionIndex++;
    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex];
    } else {
      this.finished = true;
      this.answerSelected =
        quizz_questions.results[this.checkResult(this.answers)];
      this.getPokemonImg(this.checkResult(this.answers));
    }
  }

  getPokemonImg(answer: string) {
    const namePokemon = this.namePokemon(answer);
    return this.pokeApi.getPokemonImg(namePokemon).subscribe((res) => {
      this.image = res.sprites.other.showdown.front_default;
    });
  }

  namePokemon(answer: string): string {
    if (answer === "A") {
      return "machamp";
    } else if (answer === "B") {
      return "alakazam";
    } else if (answer === "C") {
      return "jolteon";
    } else if (answer === "D") {
      return "charizard";
    }
  }

  checkResult(answers: string[]) {
    const result = answers.reduce((previous, current, i, arr) => {
      if (
        arr.filter((item) => item === previous).length >
        arr.filter((item) => item === current).length
      ) {
        return previous;
      } else {
        return current;
      }
    });
    return result;
  }
}
