create table imagequiz.flowers
(
	id bigserial primary key,
	flowername text not null,
	picture text not null
);

create table imagequiz.questions
(
	id bigserial primary key,
	flowerid integer references imagequiz.flowers(id),
	choices text not null,
	answer text not null
);

create table imagequiz.quizzes
(
	id bigserial primary key,
	quiznumber integer not null,
	questionid integer not null
);

create table imagequiz.customers
(
	id bigserial primary key,
	username text,
	email text,
	password text
);

create table imagequiz.scores
(
	id bigserial primary key,
	cutomerid integer references imagequiz.customers(id),
	quizid integer references imagequiz.quizzes(id),
	score integer
);