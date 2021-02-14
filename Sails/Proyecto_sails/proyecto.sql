--
-- PostgreSQL database dump
--

-- Dumped from database version 12.5 (Ubuntu 12.5-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.5 (Ubuntu 12.5-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: admin; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admin (
    id integer NOT NULL,
    nombre character varying,
    email character varying,
    "contraseña" character varying,
    estado character varying
);


ALTER TABLE public.admin OWNER TO postgres;

--
-- Name: admin_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.admin_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.admin_id_seq OWNER TO postgres;

--
-- Name: admin_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.admin_id_seq OWNED BY public.admin.id;


--
-- Name: carrito; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.carrito (
    id integer NOT NULL,
    cliente_id integer,
    foto_id integer
);


ALTER TABLE public.carrito OWNER TO postgres;

--
-- Name: carrito_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.carrito_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.carrito_id_seq OWNER TO postgres;

--
-- Name: carrito_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.carrito_id_seq OWNED BY public.carrito.id;


--
-- Name: cliente; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cliente (
    id integer NOT NULL,
    nombre character varying,
    email character varying,
    "contraseña" character varying,
    estado character varying
);


ALTER TABLE public.cliente OWNER TO postgres;

--
-- Name: cliente_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cliente_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cliente_id_seq OWNER TO postgres;

--
-- Name: cliente_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cliente_id_seq OWNED BY public.cliente.id;


--
-- Name: deseos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.deseos (
    id integer NOT NULL,
    cliente_id integer,
    foto_id integer
);


ALTER TABLE public.deseos OWNER TO postgres;

--
-- Name: deseos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.deseos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.deseos_id_seq OWNER TO postgres;

--
-- Name: deseos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.deseos_id_seq OWNED BY public.deseos.id;


--
-- Name: foto; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.foto (
    id integer NOT NULL,
    titulo character varying,
    url character varying,
    estado character varying
);


ALTER TABLE public.foto OWNER TO postgres;

--
-- Name: foto_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.foto_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.foto_id_seq OWNER TO postgres;

--
-- Name: foto_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.foto_id_seq OWNED BY public.foto.id;


--
-- Name: registro_carrito; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.registro_carrito (
    id integer NOT NULL,
    cliente_id integer,
    foto_id integer,
    fecha character varying
);


ALTER TABLE public.registro_carrito OWNER TO postgres;

--
-- Name: registro_carrito_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.registro_carrito_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.registro_carrito_id_seq OWNER TO postgres;

--
-- Name: registro_carrito_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.registro_carrito_id_seq OWNED BY public.registro_carrito.id;


--
-- Name: admin id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin ALTER COLUMN id SET DEFAULT nextval('public.admin_id_seq'::regclass);


--
-- Name: carrito id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carrito ALTER COLUMN id SET DEFAULT nextval('public.carrito_id_seq'::regclass);


--
-- Name: cliente id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cliente ALTER COLUMN id SET DEFAULT nextval('public.cliente_id_seq'::regclass);


--
-- Name: deseos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deseos ALTER COLUMN id SET DEFAULT nextval('public.deseos_id_seq'::regclass);


--
-- Name: foto id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.foto ALTER COLUMN id SET DEFAULT nextval('public.foto_id_seq'::regclass);


--
-- Name: registro_carrito id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.registro_carrito ALTER COLUMN id SET DEFAULT nextval('public.registro_carrito_id_seq'::regclass);


--
-- Data for Name: admin; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.admin (id, nombre, email, "contraseña", estado) FROM stdin;
2	marialena	marialena@gmail.com	marialena	activa
1	kevin	123k@gmail.com	123	activa
\.


--
-- Data for Name: carrito; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.carrito (id, cliente_id, foto_id) FROM stdin;
3	\N	\N
31	12	3
32	12	1
35	22	3
\.


--
-- Data for Name: cliente; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cliente (id, nombre, email, "contraseña", estado) FROM stdin;
1	kevin	123@gmail.comm	123	activa
8	kevin	mira@gmail.com		activa
9	kevin	a3@gmail.com		activa
10	kevin_el_crack	kevin_el_crack@gmail.com		activa
12	zzz	zzz@gmail.com	zzz	activa
13	ddd	ddd@gmail.com	ddd	activa
14	ttt	ttt@gmail.com	ttt	activa
15	rrr	rrr@gmail.com	rrr	activa
16	hhh	hhh@gmail.com	hhh	activa
17	hhh2	hhh2@gmail.com	2hhh	activa
18	tt	tt@gmail.com	tt	activa
19	iii	iii@gmail.com	iii	activa
20	miguelone	miguelone@gmail.com	miguelone	activa
21	luck	luck@gmail.com	luck	activa
22	micorrea	micorrea@gmail.com	zzz	activa
23	toph	toph@gmail.com	toph	activa
24	enela	enela@gmail.com	enela	activa
25	pepito	pepito@gmail.com	pepito	activa
6	213	dn@gmail.com		activa
11	123k	123k@gmail.com	123	activa
\.


--
-- Data for Name: deseos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.deseos (id, cliente_id, foto_id) FROM stdin;
8	24	4
\.


--
-- Data for Name: foto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.foto (id, titulo, url, estado) FROM stdin;
19	Tecnologia Abstracta	19.jpg	inactiva
4	Auto	4.jpg	activa
3	Fabrica	5.jpg	activa
2	Planta	6.jpg	activa
1	Campana	7.jpg	activa
24	Planta Nuclear	9.jpg	activa
\.


--
-- Data for Name: registro_carrito; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.registro_carrito (id, cliente_id, foto_id, fecha) FROM stdin;
30	11	3	7-2-2021 15:30:43
31	11	2	7-2-2021 15:30:43
32	11	1	7-2-2021 15:30:43
33	11	3	7-2-2021 15:48:22
34	11	2	7-2-2021 15:48:22
35	11	3	7-2-2021 15:51:53
38	11	3	7-2-2021 16:46:9
39	11	2	7-2-2021 16:46:9
40	11	4	8-2-2021 20:5:26
41	11	1	8-2-2021 20:5:26
42	13	2	8-2-2021 20:32:24
43	13	2	8-2-2021 20:32:45
46	24	4	9-2-2021 15:11:57
47	11	3	9-2-2021 15:16:7
48	11	4	9-2-2021 15:16:7
49	11	3	9-2-2021 17:21:32
50	11	19	9-2-2021 21:45:54
51	11	24	10-2-2021 21:15:13
52	11	24	11-2-2021 19:26:37
\.


--
-- Name: admin_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.admin_id_seq', 1, true);


--
-- Name: carrito_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.carrito_id_seq', 149, true);


--
-- Name: cliente_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cliente_id_seq', 25, true);


--
-- Name: deseos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.deseos_id_seq', 11, true);


--
-- Name: foto_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.foto_id_seq', 24, true);


--
-- Name: registro_carrito_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.registro_carrito_id_seq', 52, true);


--
-- Name: admin admin_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_pkey PRIMARY KEY (id);


--
-- Name: carrito carrito_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carrito
    ADD CONSTRAINT carrito_pkey PRIMARY KEY (id);


--
-- Name: cliente cliente_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_pkey PRIMARY KEY (id);


--
-- Name: deseos deseos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deseos
    ADD CONSTRAINT deseos_pkey PRIMARY KEY (id);


--
-- Name: foto foto_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.foto
    ADD CONSTRAINT foto_pkey PRIMARY KEY (id);


--
-- Name: registro_carrito registro_carrito_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.registro_carrito
    ADD CONSTRAINT registro_carrito_pkey PRIMARY KEY (id);


--
-- Name: carrito cliente_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carrito
    ADD CONSTRAINT cliente_id FOREIGN KEY (cliente_id) REFERENCES public.cliente(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: deseos cliente_id_deseos; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deseos
    ADD CONSTRAINT cliente_id_deseos FOREIGN KEY (cliente_id) REFERENCES public.cliente(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: registro_carrito cliente_id_reg; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.registro_carrito
    ADD CONSTRAINT cliente_id_reg FOREIGN KEY (cliente_id) REFERENCES public.cliente(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: carrito foto_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carrito
    ADD CONSTRAINT foto_id FOREIGN KEY (foto_id) REFERENCES public.foto(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: deseos foto_id_deseos; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deseos
    ADD CONSTRAINT foto_id_deseos FOREIGN KEY (foto_id) REFERENCES public.foto(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

