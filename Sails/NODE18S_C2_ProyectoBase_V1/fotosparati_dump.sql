--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.9
-- Dumped by pg_dump version 9.6.9

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: cliente; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cliente (
    id smallint NOT NULL,
    nombre character varying(256),
    email character varying(256),
    contrasena character varying(256)
);


--
-- Name: cliente_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.cliente_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cliente_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.cliente_id_seq OWNED BY public.cliente.id;


--
-- Name: admin; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.admin (
    id smallint DEFAULT nextval('public.cliente_id_seq'::regclass) NOT NULL,
    nombre character varying(256),
    email character varying(256),
    contrasena character varying(256)
);


--
-- Name: carro_compra; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.carro_compra (
    id smallint NOT NULL,
    cliente_id smallint,
    foto_id smallint
);


--
-- Name: carro_compra_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.carro_compra_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: carro_compra_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.carro_compra_id_seq OWNED BY public.carro_compra.id;


--
-- Name: foto; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.foto (
    id smallint NOT NULL,
    contenido character varying(256),
    titulo character varying,
    activa boolean DEFAULT true
);


--
-- Name: foto_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.foto_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: foto_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.foto_id_seq OWNED BY public.foto.id;


--
-- Name: lista_deseo; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.lista_deseo (
    id smallint DEFAULT nextval('public.carro_compra_id_seq'::regclass) NOT NULL,
    cliente_id smallint,
    foto_id smallint
);


--
-- Name: orden; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orden (
    id smallint NOT NULL,
    fecha date,
    cliente_id smallint,
    total smallint
);


--
-- Name: orden_detalle; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orden_detalle (
    id smallint NOT NULL,
    orden_id smallint,
    foto_id smallint
);


--
-- Name: orden_detalle_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.orden_detalle_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orden_detalle_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.orden_detalle_id_seq OWNED BY public.orden_detalle.id;


--
-- Name: orden_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.orden_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orden_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.orden_id_seq OWNED BY public.orden.id;


--
-- Name: carro_compra id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carro_compra ALTER COLUMN id SET DEFAULT nextval('public.carro_compra_id_seq'::regclass);


--
-- Name: cliente id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cliente ALTER COLUMN id SET DEFAULT nextval('public.cliente_id_seq'::regclass);


--
-- Name: foto id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.foto ALTER COLUMN id SET DEFAULT nextval('public.foto_id_seq'::regclass);


--
-- Name: orden id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orden ALTER COLUMN id SET DEFAULT nextval('public.orden_id_seq'::regclass);


--
-- Name: orden_detalle id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orden_detalle ALTER COLUMN id SET DEFAULT nextval('public.orden_detalle_id_seq'::regclass);


--
-- Data for Name: admin; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.admin (id, nombre, email, contrasena) FROM stdin;
3	pedro	pedro@fotosparati.com	123123
\.


--
-- Data for Name: carro_compra; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.carro_compra (id, cliente_id, foto_id) FROM stdin;
\.


--
-- Name: carro_compra_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.carro_compra_id_seq', 52, true);


--
-- Data for Name: cliente; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.cliente (id, nombre, email, contrasena) FROM stdin;
2	Luis	luis@gmail.com	123123
\.


--
-- Name: cliente_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.cliente_id_seq', 3, true);


--
-- Data for Name: foto; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.foto (id, contenido, titulo, activa) FROM stdin;
1	1.jpg	Verde	t
2	2.jpg	Olas	t
3	3.jpg	Árboles	t
4	4.jpg	ByN	t
12	12.JPG	Luna	t
\.


--
-- Name: foto_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.foto_id_seq', 12, true);


--
-- Data for Name: lista_deseo; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.lista_deseo (id, cliente_id, foto_id) FROM stdin;
\.


--
-- Data for Name: orden; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.orden (id, fecha, cliente_id, total) FROM stdin;
40	2018-11-08	2	1
41	2018-11-07	2	2
42	2018-11-07	2	3
\.


--
-- Data for Name: orden_detalle; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.orden_detalle (id, orden_id, foto_id) FROM stdin;
40	40	2
41	41	1
42	41	2
43	42	2
44	42	1
45	42	4
\.


--
-- Name: orden_detalle_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.orden_detalle_id_seq', 45, true);


--
-- Name: orden_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.orden_id_seq', 42, true);


--
-- Name: lista_deseo carro_compra_copy1_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lista_deseo
    ADD CONSTRAINT carro_compra_copy1_pkey PRIMARY KEY (id);


--
-- Name: carro_compra carro_compra_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carro_compra
    ADD CONSTRAINT carro_compra_pkey PRIMARY KEY (id);


--
-- Name: admin cliente_copy1_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT cliente_copy1_pkey PRIMARY KEY (id);


--
-- Name: cliente cliente_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_pkey PRIMARY KEY (id);


--
-- Name: foto foto_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.foto
    ADD CONSTRAINT foto_pkey PRIMARY KEY (id);


--
-- Name: orden_detalle orden_detalle_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orden_detalle
    ADD CONSTRAINT orden_detalle_pkey PRIMARY KEY (id);


--
-- Name: orden orden_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orden
    ADD CONSTRAINT orden_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

