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

### To learn more about diagrams:
[What is a Diagram](https://en.wikipedia.org/wiki/Diagram)

[What is the Cartesian plane in simple terms?](https://www.mathsisfun.com/data/cartesian-coordinates.html)

[Cartisian Coordinate System(Wikipedia)](https://en.wikipedia.org/wiki/Cartesian_coordinate_system)

[How is a Time-Space Diagram is used in trasportation](https://en.wikipedia.org/wiki/Time%E2%80%93distance_diagram)

[Historical Infographics: From Paris with Love](https://sandrarendgen.wordpress.com/2019/03/15/data-trails-from-paris-with-love/) (interesting article about Marey Charts and its history)

["Stigler’s Law of Eponymy and Marey’s Train Schedule"](https://www.researchgate.net/publication/286085953_Visual_Revelations_Stigler%27s_Law_of_Eponymy_and_Marey%27s_Train_Schedule_Did_Serjev_Do_It_Before_Ibry_and_What_About_Jules_Petiet#pf1)  Howard Wainer, Polina Harik, and John Neter - [Researchgate.net](https://www.researchgate.net/) (more about the history space-time diagram and trains scheduling)

---

## To-do

1) Possibility to select speed in recurrent trains creator
2) Possibility to change colors of single trains through a color picker
3) Implementing a dialog to change speeds and stops time for all (or some) trains at once
4) Possibility to make the recurring trains start from a station different than staion 1
5) Possibility to add lines even when they do not share any station (Implementations of ["Case 3a"](https://github.com/CondensedChaos/condensedchaos.github.io#case-3a) and ["Case 3b"](https://github.com/CondensedChaos/condensedchaos.github.io#case-3b) scenarios.)
6) Possibility to change the names of stations individually (instead of Station 1..Station N)
8) Light mode / Dark mode : as of now only dark mode implemented as I can't stand looking at black text on a white background on a monitor for more than 5 minutes.... Sorry Light folks but Darth wins today...

---

## A note from the author
I made this web-app for the simple purpose of having a companion app for my [Rail Train System for Starbound](https://github.com/CondensedChaos/Starbound-Rail-Train) mod.  

I am not a web-developer of any sort, I'm just a self-taught computer enthusiast who enjoys doing things for myself.  
I am aware that this web-app does not employ the best coding good practices and that it would need a good deal of optimizations but it does it job.  

My main focus was on the actual Starbound mod, if anybody wants to fork this project and make it something better, feel free to do so, just respect the project's [license](https://github.com/CondensedChaos/condensedchaos.github.io/tree/main#license).  

While this web-app was made to have a system to do scheduling of trains using Marey Charts for a Starbound mod, where running times are in the scale of minutes, it could be used for real life scenarios, with some adaptations.  

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

## How to use

---

<div align="center"> <img src="https://github.com/CondensedChaos/condensedchaos.github.io/assets/121590835/790fb59a-27e5-47b9-a912-3116227d01a8" alt="01" /> </div>

<div align="center">
<img src="https://github.com/CondensedChaos/condensedchaos.github.io/assets/121590835/a7d169ef-8774-4bc0-b865-96a9c414902a" alt="03" />
</div>

<div align="center">
<img src="https://github.com/CondensedChaos/condensedchaos.github.io/assets/121590835/70aabb4c-9124-4dc6-aa95-555431f7b42b" alt="05" />
</div>

<div align="center">
<img src="https://github.com/CondensedChaos/condensedchaos.github.io/assets/121590835/e94b8a13-0478-4af5-8a2b-e4a5c7b226be" alt="06" />
</div>

Let's say we have to make a graph starting from these data:

<div align="center">
<img src="https://github.com/CondensedChaos/condensedchaos.github.io/assets/121590835/f8355a3a-9e1b-4cce-ac42-f7306e5c5322" alt="19-testrundata" />
</div>

<div align="center">
<img src="https://github.com/CondensedChaos/condensedchaos.github.io/assets/121590835/cd007e24-58eb-4b64-b379-e52753917eb7" alt="13" />
</div>

<div align="center">
<img src="https://github.com/CondensedChaos/condensedchaos.github.io/assets/121590835/70ee685b-a264-4f83-9062-2359abae7901" alt="14" />
</div>

The arrows in the upper-left and upper-right corner open a pop-up menu that allows you to modify, respectively, the eastbound and westbound trains parameters:
<div align="center">
<img src="https://github.com/CondensedChaos/condensedchaos.github.io/assets/121590835/13307662-f17e-4f5f-8f4d-41fb4ca85acc" alt="15" />
</div>

Train 1-E-A : meaning eastbound train number 1 of Line A.
<div align="center">
<img src="https://github.com/CondensedChaos/condensedchaos.github.io/assets/121590835/26f533d8-e2ed-421f-bce0-07e8cebde5f4" alt="16" />
</div>


<div align="center">
<img src="https://github.com/CondensedChaos/condensedchaos.github.io/assets/121590835/26ad2cab-ab68-4a4a-ace5-eaeeabb97999" alt="22" />
</div>

The main tool you should use to plan your schedule is the "Add recurring trains" tab, by moving the sliders you will see in real time the number of trains you'll need:
<div align="center">
<img src="https://github.com/CondensedChaos/condensedchaos.github.io/assets/121590835/a0d03572-f668-4f0d-bbc6-e121e50f9caa" alt="17" />
</div>

<div align="center">
<img src="https://github.com/CondensedChaos/condensedchaos.github.io/assets/121590835/f9206f35-33cb-4c8b-a4a2-180996aa84b9" alt="17a" />
</div>

So for example you could go with one train every 30 seconds and you'll see you'll need a total for 10 trains (5 eastbound and 5 westbound trains)
<div align="center">
<img src="https://github.com/CondensedChaos/condensedchaos.github.io/assets/121590835/24c31180-bea9-4b30-84f9-67533a41f2ba" alt="18" />
</div>

And this is the generated graph:
<div align="center">
<img src="https://github.com/CondensedChaos/condensedchaos.github.io/assets/121590835/d637ef37-6f2f-4315-90ae-fa74f10276ae" alt="19" />
</div>

By changing number of iteration you can see the evolution in time of how the trains will go:
<div align="center">
<img src="https://github.com/CondensedChaos/condensedchaos.github.io/assets/121590835/c691f4cf-ee6e-4c5d-bd84-6094a7bbfb18" alt="20" />
</div>

<div align="center">
<img src="https://github.com/CondensedChaos/condensedchaos.github.io/assets/121590835/a5d45bfb-8e75-46e2-9eb0-6a4da775ebd1" alt="21" />
</div>

If you wish you could tweak parameters of each train to better suit your needs, just be aware that everey change has its repercussions on the long run and increase the number of iterations to see how it'll go, you can hide some trains from the view by clicking in their name in the legend just below the graph and by moving the mouse pointer on the graph you'll see the time of every train at every station, by using the mouse whell you can zoom in and zoom out and by dragging the mouse pointer on the graph while clicking the left mouse button you are able to move the zoomed in view.
<div align="center">
<img src="https://github.com/CondensedChaos/condensedchaos.github.io/assets/121590835/da5dcd95-62af-46ed-a7d3-e381a36dbcd2" alt="23" />
</div>

<div align="center">
<img src="https://github.com/CondensedChaos/condensedchaos.github.io/assets/121590835/cce361e1-7f33-4414-a3cf-7b559beba9cc" alt="24" />
</div>

<div align="center">
<img src="https://github.com/CondensedChaos/condensedchaos.github.io/assets/121590835/51538e34-bfbe-4cbf-9253-77895a1a8e12" alt="25" />
</div>

<div align="center">
<img src="https://github.com/CondensedChaos/condensedchaos.github.io/assets/121590835/f62561f6-6064-4202-ae65-7ae267d2b238" alt="27" />
</div>

<div align="center">
<img src="https://github.com/CondensedChaos/condensedchaos.github.io/assets/121590835/b0ee80ad-598a-401d-84fa-40fbb96db91b" alt="26" />
</div>

<div align="center">
<img src="https://github.com/CondensedChaos/condensedchaos.github.io/assets/121590835/172be021-2a76-490e-a1b9-ab0f9fe86c3d" alt="28" />
</div>

<div align="center">
<img src="https://github.com/CondensedChaos/condensedchaos.github.io/assets/121590835/54190ade-7df6-49ec-a500-6b62a209de13" alt="29" />
</div>

If you're not satisfied you could start over by changing the parameters in the "add recurring trains" tab.

---

#### More lines in a graph

More lines can share parts of their track and you can use this app to visualize their time-space diagram.
Below are all the use-cases:

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

A circular line sharing some of its station with a non-circular line. The non-circular line's tracks it's the same as the circular line's although some of the stations are not shared.

<div align="center">
<img src="https://github.com/CondensedChaos/condensedchaos.github.io/assets/121590835/d92950a1-395a-4065-ab50-f6ce869f9d52" alt="Case 2a" />
</div>

##### Case 2b

Two non-circular line sharing some stations, one line starts where the other line ends.

<div align="center">
<img src="https://github.com/CondensedChaos/condensedchaos.github.io/assets/121590835/6d21895c-e57a-493e-90ce-c684ec6487c6" alt="Case 2b" />
</div>

##### Case 3a

To be implemented:  
![case3a](https://github.com/CondensedChaos/condensedchaos.github.io/assets/121590835/b2bf9fc0-2fc5-46a6-b334-202ffa2c120b)

##### Case 3b

To be implemented:
![case3b](https://github.com/CondensedChaos/condensedchaos.github.io/assets/121590835/4c86e6ae-3e19-4cb3-9809-3f614f80886d)

---


<div align="center">
<img src="https://github.com/CondensedChaos/condensedchaos.github.io/assets/121590835/19e782cc-4fbe-4498-a042-d93ac5aca562" alt="02" />
</div>

<div align="center">
<img src="https://github.com/CondensedChaos/condensedchaos.github.io/assets/121590835/f4f77e19-8513-4d06-a521-3ea3dc88c991" alt="07" />
</div>

So for example if we want to create a graph for the two lines of the following scenario:

<div align="center">
<img src="https://github.com/CondensedChaos/condensedchaos.github.io/assets/121590835/260acd28-b71b-4472-8a7a-b64f26e8143b" alt="Case 1 - 1 Circular line sharing stations with a non-circular line" />
</div>

<div align="center">
<img src="https://github.com/CondensedChaos/condensedchaos.github.io/assets/121590835/cbb53a95-761f-4ad9-b06a-67d1be9908c4" alt="08" />
</div>


<div align="center">
<img src="https://github.com/CondensedChaos/condensedchaos.github.io/assets/121590835/c4667931-7930-4b18-a220-7e2322f6da2e" alt="09" />
</div>


<div align="center">
<img src="https://github.com/CondensedChaos/condensedchaos.github.io/assets/121590835/8a011247-aa08-4579-b720-a45eccb11201" alt="10" />
</div>


<div align="center">
<img src="https://github.com/CondensedChaos/condensedchaos.github.io/assets/121590835/81b1ebd9-dc88-4393-bcab-af513ab18694" alt="11" />
</div>

<div align="center">
<img src="https://github.com/CondensedChaos/condensedchaos.github.io/assets/121590835/5d4fcec4-73aa-4deb-8f25-69606f0da575" alt="11" />
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

Made by [Condensed Chaos](https://github.com/CondensedChaos) ([Meteora](https://steamcommunity.com/profiles/76561198397117901/myworkshopfiles/?appid=211820) on [Steam Workshop](https://steamcommunity.com/app/211820/workshop/))</a>
