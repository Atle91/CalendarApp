using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;
using System.Diagnostics;
using System.Security.Cryptography;
using System.Text;
namespace WebApplication5.Models
{
    public class DBConnect
    {
        private MySqlConnection connection;
        public string server;
        private string database;
        private string uid;
        private string password;

        public DBConnect()
        {
            Initalize();
        }

        private void Initalize()
        {
            server = "MYSQL6002.site4now.net";
            database = "db_a37728_atlekri";
            uid = "a37728_atlekri";
            password = "Bonbon321";
            string connectionString;
            connectionString = String.Format(
                "SERVER={0};DATABASE={1};USERNAME={2};PASSWORD={3}", 
                server, database, uid, password);
            connection = new MySqlConnection(connectionString);

        }
        private bool OpenConnect()
        {
            try
            {
                connection.Open();
                return true;
            }
            catch(MySqlException ex)
            {
                Console.WriteLine("Error:" + ex.Number);

                Console.Read();
                return false;
            }
        }
        private bool CloseConnection()
        {
            try
            {
                connection.Close();
                return true;
            }
            catch(MySqlException ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }
        
        public void Command(string query)
        {
            
            if (this.OpenConnect() == true)
            {
                MySqlCommand cmd = new MySqlCommand(query, connection);
                
                cmd.ExecuteNonQuery();

                this.CloseConnection();
            }

        }
        public bool AttemptLogin(string query, string password)
        {
            string realPassword = null;
            if (this.OpenConnect() == true)
            {
                MySqlCommand cmd = new MySqlCommand(query, connection);
                cmd.ExecuteNonQuery();
                Debug.WriteLine("query: " + query);
                MySqlDataReader dataReader = cmd.ExecuteReader();

                while(dataReader.Read())
                {
                    Debug.WriteLine("data 1: " + dataReader[0] + "data2:" + dataReader[1]);
                    realPassword = Convert.ToString(dataReader[1]);

                    

                }

                using (MD5 md5Hash = MD5.Create())
                {
                    string hashPassword = GetMd5Hash(md5Hash, password);
                    

                   
                    this.CloseConnection();
                    if (realPassword == hashPassword) return true;
                    


                }
                

            }
            return false;
        }

        public string getId(string query, string name)
        {
            string item = null;
            if (this.OpenConnect() == true)
            {
                MySqlCommand cmd = new MySqlCommand(query, connection);
                cmd.ExecuteNonQuery();
                Debug.WriteLine("query: " + query);
                MySqlDataReader dataReader = cmd.ExecuteReader();

                while (dataReader.Read())
                {
                    Debug.WriteLine("data 1: " + dataReader[0]);
                    item = Convert.ToString(dataReader[0]);

                }

                this.CloseConnection();

            }
            return item;
        }

        public bool CheckUser(string query)
        {
            Debug.WriteLine("CHECKUSER: " + query);
            if(this.OpenConnect() == true)
            {
                MySqlCommand cmd = new MySqlCommand(query, connection);

                cmd.ExecuteNonQuery();

                MySqlDataReader dataReader = cmd.ExecuteReader();
                
                
                while (dataReader.Read())
                {
                    if ((Int64)dataReader[0] == 1)
                    {
                        this.CloseConnection();
                        return true;
                    }

                }
                
                

            }
            this.CloseConnection();
            return false;
             
        }
        private string GetMd5Hash(MD5 md5Hash, string input)
        {

            //Convert the input to a byte array and compute the hash.
            byte[] data = md5Hash.ComputeHash(Encoding.UTF8.GetBytes(input));
            //Create a new Stringbuilder to collect the bytes
            //and create a string.

            StringBuilder sBuilder = new StringBuilder();

            //Loop through each byte of the hashed data
            // and format each one as a hexadecimal string.
            for(int i = 0; i < data.Length; i++)
            {
                sBuilder.Append(data[i].ToString("x2"));
            }
            return sBuilder.ToString();
            
        }


    }
}
