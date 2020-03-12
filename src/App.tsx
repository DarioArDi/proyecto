import React from 'react';
import { useForm } from 'react-hook-form';


export default function App() {
	const { register, handleSubmit, watch, errors } = useForm();
	const onSubmit = (data:any) => {
	  console.log(data);
	}; // your form submit function which will invoke after successful validation
	console.log(watch("example")); // you can watch individual input by pass the name of the input
	return (
	  <form onSubmit={handleSubmit(onSubmit)} className="App">
		<label>Nombre:</label>
		<input type="text" name="nombre" placeholder="Juan" ref={register({required:true})}/>
		{errors.nombre && (<label>Es necesario rellenar este recuadro</label>)}
		<br/>
		<label>Contraseña:</label>
		<input type="text" name="contrasena" ref={register({required:true})}/>
		{errors.contrasena && (<label>Es necesario rellenar este recuadro</label>)}
		<br/>
		<input type="submit" name="entrar" value="Ingresar"/>
	  </form>
	);
  };