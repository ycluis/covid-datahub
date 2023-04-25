CREATE TABLE cases_malaysia (
  id SERIAL NOT NULL,
  date VARCHAR NOT NULL,
  info jsonb,
  createdAt timestamp default now()
);

CREATE TABLE cases_state (
  id SERIAL NOT NULL,
  date VARCHAR NOT NULL,
  state VARCHAR NOT NULL,
  info jsonb,
  createdAt timestamp default now()
);

CREATE TABLE vacc_malaysia (
  id SERIAL NOT NULL,
  date VARCHAR NOT NULL,
  info jsonb,
  createdAt timestamp default now()
);

CREATE TABLE vacc_state (
  id SERIAL NOT NULL,
  date VARCHAR NOT NULL,
  state VARCHAR NOT NULL,
  info jsonb,
  createdAt timestamp default now()
);