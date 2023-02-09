import { useState } from "react";
import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

export default function Filtercar() {
  return (
    <Form>
      <Form.Group as={Col} md="2">
        <Form.Label>Make</Form.Label>
        <Form.Select name="make">
          <option value="BMW">BMW</option>
          <option value="Chevrolet">Chevrolet</option>
          <option value="FIAT">FIAT</option>
          <option value="Mitsubishi">Mitsubishi</option>
          <option value="Nissan">Nissan</option>
          <option value="Tesla">Tesla</option>
          <option value="Toyota">Toyota</option>
          <option value="Hyundai">Hyundai</option>
          <option value="Ford">Ford</option>
        </Form.Select>
      </Form.Group>
      <Form.Group as={Col} md="2">
        <Form.Label>Style</Form.Label>
        <Form.Select name="style">
          <option value="Sedan">Sedan</option>
          <option value="Hatchback">Hatchback</option>
          <option value="SUV">SUV</option>
          <option value="Wagon">Wagon</option>
        </Form.Select>
      </Form.Group>
      <Form.Group as={Col} md="2">
        <Form.Label>Fuel</Form.Label>
        <Form.Select name="fuel">
          <option value="gasoline">Gasoline</option>
          <option value="Diesel">Diesel</option>
          <option value="Electric">Electric</option>
          <option value="hybrid">hybrid</option>
        </Form.Select>
      </Form.Group>
      <Form.Group as={Col} md="2">
        <Form.Label>Transmission</Form.Label>
        <Form.Select name="transmission">
          <option value="Manual">Manual</option>
          <option value="Automatic">Automatic</option>
          <option value="CVT">CVT</option>
        </Form.Select>
      </Form.Group>
      <Form.Group as={Col} md="2">
        <Form.Label>Doors</Form.Label>
        <Form.Select name="doors">
          <option value="3">3</option>
          <option value="4">4 or more</option>
        </Form.Select>
      </Form.Group>
      <Form.Group as={Col} md="2">
        <Form.Label>Year</Form.Label>
        <Form.Select name="year">
          <option value="1980">1980</option>
          <option value="1981">1981</option>
          <option value="1982">1982</option>
          <option value="1983">1983</option>
          <option value="1984">1984</option>
          <option value="1985">1985</option>
          <option value="1986">1986</option>
          <option value="1987">1987</option>
          <option value="1988">1988</option>
          <option value="1989">1989</option>
          <option value="1990">1990</option>
          <option value="1991">1991</option>
          <option value="1992">1992</option>
          <option value="1993">1993</option>
          <option value="1994">1994</option>
          <option value="1995">1995</option>
          <option value="1996">1996</option>
          <option value="1997">1997</option>
          <option value="1998">1998</option>
          <option value="1999">1999</option>
          <option value="2000">2000</option>
          <option value="2001">2001</option>
          <option value="2002">2002</option>
          <option value="2003">2003</option>
          <option value="2004">2004</option>
          <option value="2005">2005</option>
          <option value="2006">2006</option>
          <option value="2007">2007</option>
          <option value="2008">2008</option>
          <option value="2009">2009</option>
          <option value="2010">2010</option>
          <option value="2011">2011</option>
          <option value="2012">2012</option>
          <option value="2013">2013</option>
          <option value="2014">2014</option>
          <option value="2015">2015</option>
          <option value="2016">2016</option>
          <option value="2017">2017</option>
          <option value="2018">2018</option>
          <option value="2019">2019</option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
        </Form.Select>
      </Form.Group>
    </Form>
  );
}
