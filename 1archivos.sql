CREATE TABLE usuario(
	id_usuario SERIAL PRIMARY KEY,
	tipo_documento VARCHAR(60) NOT NULL,
  numero_Documento INTEGER NOT NULL UNIQUE,
  nombre VARCHAR(60) NOT NULL,
  apellido VARCHAR(60) NOT NULL,
  email VARCHAR(60) NOT NULL,
  telefono INTEGER NOT NULL,
  genero CHAR(1) CHECK (genero IN('M','F')),
	password VARCHAR(60) CHECK (length(password) > 3),
	direccion VARCHAR(60) NOT NULL,
  tipousuario INTEGER NOT NULL
);



CREATE TABLE cliente(
  id_cliente SERIAL PRIMARY KEY,
  imagen_recibos_publicos BYTEA,
  medio_pago VARCHAR(10) CHECK(medio_pago IN('Credito','Debito')),
  nummero_medio_pago VARCHAR(20),
  id_usuario INTEGER,
  FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);




CREATE TABLE Trabajador(
  id_trabajador SERIAL PRIMARY KEY,
  imagen_perfil BYTEA,
  imagen_doc_identidad BYTEA,
  promedio_estrellas FLOAT CHECK (promedio_estrellas >= 0 AND promedio_estrellas <= 5),
  disponible BOOLEAN,
  id_usuario INTEGER,
  FOREIGN KEY(id_usuario) REFERENCES Usuario(id_usuario)
);



CREATE TABLE Labor(
  id_labor SERIAL PRIMARY KEY,
  nombre_labor VARCHAR(60),
  precio_unidad_labor INTEGER
);



CREATE TABLE LaborTrabajador(
  id_labor_trabajador SERIAL PRIMARY KEY,
  id_trabajador INTEGER,
  id_labor INTEGER,
  FOREIGN KEY(id_trabajador) REFERENCES Trabajador(id_trabajador),
  FOREIGN KEY(id_labor) REFERENCES Labor(id_labor)
);



CREATE TABLE Servicio(
  id_servicio SERIAL PRIMARY KEY,
  id_usuario INTEGER,
  id_trabajador INTEGER,
  id_labor INTEGER,
  fecha_servicio DATE,
  observacion_servicio VARCHAR(400),
  valor_servicio INTEGER,
  estado_servicio VARCHAR(20),
  calificacion_servicio FLOAT CHECK (calificacion_servicio >= 0 AND calificacion_servicio <= 5),
  FOREIGN KEY(id_usuario) REFERENCES Usuario(id_usuario),
  FOREIGN KEY(id_trabajador) REFERENCES Trabajador(id_trabajador),
  FOREIGN KEY(id_labor) REFERENCES Labor(id_labor)
);



CREATE TABLE Pago(
  id_pago SERIAL PRIMARY KEY,
  id_servicio INTEGER,
  fecha_pago DATE,
  valor_pago INTEGER,
  numero_medio_pago VARCHAR(20),
  pago_realizado BOOLEAN,
  FOREIGN KEY(id_servicio) REFERENCES Servicio(id_servicio)
);