import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';

function Customers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios.get(config.CUSTOMERS_API)
      .then(response => {
        setCustomers(response.data);
      })
      .catch(error => {
        console.error('Error fetching customers:', error);
      });
  }, []);

  return (
    <div>
      <h1>Customers</h1>
      {customers.length === 0 ? (
        <p>No customers found.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>City</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.fname}</td>
                <td>{customer.email}</td>
                <td>{customer.city}</td>
                <td>{customer.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Customers;
