# Starbound Rail Train System - Marey Graph generator Web App
Made as a complement of: [Starbound Rail Train Mod](https://github.com/CondensedChaos/Starbound-Rail-Train)

But can be used as a Marey chart generator, just note that all times are expressed in seconds.
Anyone can make a derivative work of this web-app and turn it into a life-size Marey chart creator eventually [(License)](https://github.com/CondensedChaos/condensedchaos.github.io/tree/main#license) .

## What is a Marey chart?
A Marey chart is a [time-space diagram](https://en.wikipedia.org/wiki/Time%E2%80%93distance_diagram), a kind of [cartesian](https://en.wikipedia.org/wiki/Cartesian_coordinate_system) [diagram](https://en.wikipedia.org/wiki/Diagram) used to analyze the flow of transportation system.

French scientist E. J. Marey reproduced a marvelous graphic train schedule whose design he attributed to Charles Ibry <sup><sub>([Cit. ResearcheGate](https://www.researchgate.net/publication/286085953_Visual_Revelations_Stigler%27s_Law_of_Eponymy_and_Marey%27s_Train_Schedule_Did_Serjev_Do_It_Before_Ibry_and_What_About_Jules_Petiet#pf1))</sup></sub>

Time is plotted on the x asis, usually drawn at the top and stations are plotted on the y-axis, proportionally spaced by the physical distance between each station.

Each line on the chart represents a single train, with each point indicating its position on the tracks at a single point in time.

The steeper a line, the faster that train is traveling.


Invented in the 1840s and still used today to plan transportations network capacity and timetables.


I reccomend watching this awesome [video](https://www.youtube.com/watch?v=NFLb1IPlY_k) about Marey graphs made by YouTube Channel [Numberphile](https://www.youtube.com/channel/UCoxcjq-8xIDTYp3uz647V5A), narrated by Professor [Hannah Fry](https://en.wikipedia.org/wiki/Hannah_Fry)
watching this same video sparked the inspiration in me to build this mod and webapp.


If you wanna know more watch this [video](https://www.youtube.com/watch?v=EWVRqhypxEU) afterwards  made by dr. [Kostas Tzanakakis](https://www.researchgate.net/profile/Konstantinos-Tzanakakis), a more in depht, but stil beginner level, introduction to Marey graphs and trains timetables construction.

#### To learn more about diagrams:
[What is a Diagram](https://en.wikipedia.org/wiki/Diagram)

[What is the Cartesian plan in simple terms?](https://www.mathsisfun.com/data/cartesian-coordinates.html)

[Cartisian Coordinate System(Wikipedia)](https://en.wikipedia.org/wiki/Cartesian_coordinate_system)

[How is a Time-Space Diagram is used in trasportation](https://en.wikipedia.org/wiki/Time%E2%80%93distance_diagram)

[Historical Infographics: From Paris with Love](https://sandrarendgen.wordpress.com/2019/03/15/data-trails-from-paris-with-love/) (interesting article about Marey Charts and its history)

["Stigler’s Law of Eponymy and Marey’s Train Schedule"](https://www.researchgate.net/publication/286085953_Visual_Revelations_Stigler%27s_Law_of_Eponymy_and_Marey%27s_Train_Schedule_Did_Serjev_Do_It_Before_Ibry_and_What_About_Jules_Petiet#pf1)  Howard Wainer, Polina Harik, and John Neter - [Researchgate.net](https://www.researchgate.net/) (more about the history space-time diagram and trains scheduling)

---

## To-do

1) Possibility to select speed in recurrent trains creator
2) Possibility to change colors of single trains through a color picker
3) Possibility to add lines even when they do not share any station
4) Possibility to change the names of stations individually (instead of Station 1..Station N)
5) Light mode / Dark mode : as of now only dark mode implemented as I can't stand looking at black text on a white background on a monitor for more than 5 minutes.... Sorry Light folks but Darth wins today...

## How to use

---

Work in progress!

---

### Lines

#### Non-circular lines

They are rail lines that start in a point and end somewhere else, for trains going to east: trains will start from station 1 (or any other subsequent station except station 4) and end their ride at station 4, at the end of theri ride the trains will invert their direction, going from east to west and go back to station 1 on the same track.

Conversely trains going from west to east will start at station 4 (or any other previous station except station 1) and end their ride at station 1, inverting their direction and going back east towards station 4.

In both cases the loop will continue indefinitely.

The same line can have both trains going to east and west simultaneosly like a railway with two parallel rails.

<div align="center">
<img src="https://github.com/CondensedChaos/condensedchaos.github.io/assets/121590835/3275c4ac-84d4-4c2c-ad5d-1ac309e6dce5" alt="non-circular" />
</div>

#### Circular lines

They are rail lines that form a circular path, trains can start at any station and at the end of the ride the trains are back where they started without inverting their direction and will continue riding the rails keeping their original direction.
In Starbuond it's a train line that circle an entire planet.

For example a train going towards east starting from station 1 will pass through station 2, 3 and 4 and then it will encounter station 1 again and will continue to go east without inverting their direction.

Conversely a train going towards west starting from station 1 will pass through station 4, 3 and 2 and then it will encounter station 1 again and will continue to go west without inverting their direction.

The same line can have both trains going to east and west simultaneosly like a railway with two parallel rails.

<div align="center">
<img src="https://github.com/CondensedChaos/condensedchaos.github.io/assets/121590835/9867bbe2-1da0-44ab-9756-be7a55b8d319" alt="circular" />
</div>

#### More lines in a graph

##### Case 1a

A circular line sharing a part of its path with one or more non-circular line, the non-circular line's stations are all shared with the circular line.

<div align="center">
<img src="https://github.com/CondensedChaos/condensedchaos.github.io/assets/121590835/260acd28-b71b-4472-8a7a-b64f26e8143b" alt="Case 1 - 1 Circular line sharing stations with a non-circular line" />
</div>

##### Case 1b

Two or more non-circular lines sharing parts of their paths, the smaller lines' stations are all shared with the bigger one's

<div align="center">
<img src="https://github.com/CondensedChaos/condensedchaos.github.io/assets/121590835/55642e8a-9ca3-4982-b727-d40674a48904" alt="Case 1b" />
</div>

##### Case 2a

<div align="center">
<img src="https://github.com/CondensedChaos/condensedchaos.github.io/assets/121590835/d92950a1-395a-4065-ab50-f6ce869f9d52" alt="Case 2a" />
</div>

##### Case 2b

<div align="center">
<img src="https://github.com/CondensedChaos/condensedchaos.github.io/assets/121590835/6d21895c-e57a-493e-90ce-c684ec6487c6" alt="Case 2b" />
</div>

##### Case 3a

##### Case 3b

---

<div align="center"> <img src="https://github.com/CondensedChaos/condensedchaos.github.io/assets/121590835/790fb59a-27e5-47b9-a912-3116227d01a8" alt="01" /> </div>

<div align="center">
<img src="https://github.com/CondensedChaos/condensedchaos.github.io/assets/121590835/19e782cc-4fbe-4498-a042-d93ac5aca562" alt="02" />
</div>

<div align="center">
<img src="https://github.com/CondensedChaos/condensedchaos.github.io/assets/121590835/a7d169ef-8774-4bc0-b865-96a9c414902a" alt="03" />
</div>

---
## Credits

Made using [HighCharts](https://github.com/highcharts/highcharts) javascript library.

## License

As per Highcharts license any derivative work/fork has to repsect the following:
1) The Highcharts watermark must remain.
2) Any derivative work has to be distribuited under the same license of this repository ([Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/))

More about Highcharts Licensing [here](https://www.highcharts.com/blog/download/)

Shield: [![CC BY-NC-SA 4.0][cc-by-nc-sa-shield]][cc-by-nc-sa]

This work is licensed under a
[Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License][cc-by-nc-sa].

[![CC BY-NC-SA 4.0][cc-by-nc-sa-image]][cc-by-nc-sa]

[cc-by-nc-sa]: http://creativecommons.org/licenses/by-nc-sa/4.0/
[cc-by-nc-sa-image]: https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png
[cc-by-nc-sa-shield]: https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg
