CREATE USER yugam WITH PASSWORD='password@123'

EXECUTE sp_addrolemember db_datareader, 'yugam'
EXECUTE sp_addrolemember db_datawriter, 'yugam'
