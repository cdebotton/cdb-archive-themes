# Failed listMigrations at 2019-08-04T13:17:52.380Z
## RPC Input One Line
```json
{"id":1,"jsonrpc":"2.0","method":"listMigrations","params":{"projectInfo":"","sourceConfig":"generator photon {\n  provider = \"photonjs\"\n}\n\ngenerator nexus_prisma {\n  provider = \"nexus-prisma\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"POSTGRESQL_URL\")\n}\n\nmodel User {\n  id        String   @default(cuid()) @unique @id\n  email     String   @unique\n  password  String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  profile   Profile\n}\n\nmodel Profile {\n  id        String  @default(cuid()) @unique @id\n  firstName String?\n  lastName  String?\n}"}}
```

## RPC Input Readable
```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "listMigrations",
  "params": {
    "projectInfo": "",
    "sourceConfig": "generator photon {\n  provider = \"photonjs\"\n}\n\ngenerator nexus_prisma {\n  provider = \"nexus-prisma\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"POSTGRESQL_URL\")\n}\n\nmodel User {\n  id        String   @default(cuid()) @unique @id\n  email     String   @unique\n  password  String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  profile   Profile\n}\n\nmodel Profile {\n  id        String  @default(cuid()) @unique @id\n  firstName String?\n  lastName  String?\n}"
  }
}
```


## RPC Response
```
null
```

## Stack Trace
```bash
thread 'main' panicked at 'Creation of Postgres Schema failed: QueryError(Error { kind: Db, cause: Some(DbError { severity: "ERROR", parsed_severity: Some(Error), code: SqlState("42501"), message: "permission denied for database cdb-production", detail: None, hint: None, position: None, where_: None, schema: None, table: None, column: None, datatype: None, constraint: None, file: Some("aclchk.c"), line: Some(3483), routine: Some("aclcheck_error") }) }

stack backtrace:
   0: backtrace::backtrace::trace::h33eb18a9548cdf19 (0x1074783be)
   1: backtrace::capture::Backtrace::new_unresolved::hbe15ca481078b281 (0x1074765e8)
   2: failure::backtrace::internal::InternalBacktrace::new::h677d3f07444347de (0x107475f89)
   3: <failure::backtrace::Backtrace as core::default::Default>::default::hcac8ae7a11909b53 (0x107476175)
   4: prisma_query::connector::postgres::error::<impl core::convert::From<tokio_postgres::error::Error> for prisma_query::error::Error>::from::h3ab990a6a5efdce8 (0x106fbe02c)
   5: prisma_query::connector::metrics::query::h01b88712c3a8fa42 (0x106f776de)
   6: <prisma_query::connector::postgres::PostgreSql as prisma_query::connector::queryable::Queryable>::query_raw::h91c074011b5b5d94 (0x106fd909d)
   7: <sql_migration_connector::migration_database::Mysql as sql_migration_connector::migration_database::MigrationDatabase>::query_raw::hb294a10e76796ecd (0x106efdfb8)
   8: <sql_migration_connector::SqlMigrationConnector as migration_connector::MigrationConnector>::initialize::h1b5f177d6d7e140b (0x106ebac3e)
   9: migration_core::migration_engine::MigrationEngine::init::hc1741e842ac3d246 (0x106dfd51b)
  10: <F as jsonrpc_core::calls::RpcMethodSimple>::call::haa539304aebefe82 (0x106e3f758)
  11: <F as jsonrpc_core::calls::RpcMethod<T>>::call::h9604420825dc1ab8 (0x106de951c)
  12: <futures::future::lazy::Lazy<F,R> as futures::future::Future>::poll::h1013e7386624a6ff (0x106dfc4f2)
  13: <futures::future::then::Then<A,B,F> as futures::future::Future>::poll::h7a5eb15e13aeeeb7 (0x106de9bb0)
  14: <futures::future::map::Map<A,F> as futures::future::Future>::poll::hcafae113f65ef0e3 (0x106e05e1f)
  15: <futures::future::either::Either<A,B> as futures::future::Future>::poll::hf2314b19ebcad874 (0x106dfc800)
  16: futures::task_impl::std::set::h770978995f72d15c (0x106e34adf)
  17: std::thread::local::LocalKey<T>::with::h6be23f390bb8a5eb (0x106e386e6)
  18: futures::future::Future::wait::h3f1c0c2a77f18093 (0x106e05b2f)
  19: jsonrpc_core::io::IoHandler<M>::handle_request_sync::h4d3d723b6feb431a (0x106de3ecf)
  20: migration_core::rpc_api::RpcApi::handle::hf9fe4cc8e4df6876 (0x106e44c5b)
  21: migration_engine::main::h984fc72fc0975d50 (0x106dc056d)
  22: std::rt::lang_start::{{closure}}::h75401f289bc77adf (0x106dc04a6)
  23: std::panicking::try::do_call::h1252fc9a2ff235eb (0x10749c8c8)
  24: __rust_maybe_catch_panic (0x1074a0caf)
  25: std::rt::lang_start_internal::h4c054360e442146c (0x10749d3ae)
  26: main (0x106dc05c9))', src/libcore/result.rs:997:5
stack backtrace:
   0: std::sys::unix::backtrace::tracing::imp::unwind_backtrace
   1: std::sys_common::backtrace::_print
   2: std::panicking::default_hook::{{closure}}
   3: std::panicking::default_hook
   4: std::panicking::rust_panic_with_hook
   5: std::panicking::continue_panic_fmt
   6: rust_begin_unwind
   7: core::panicking::panic_fmt
   8: core::result::unwrap_failed
   9: <sql_migration_connector::SqlMigrationConnector as migration_connector::MigrationConnector>::initialize
  10: migration_core::migration_engine::MigrationEngine::init
  11: <F as jsonrpc_core::calls::RpcMethodSimple>::call
  12: <F as jsonrpc_core::calls::RpcMethod<T>>::call
  13: <futures::future::lazy::Lazy<F,R> as futures::future::Future>::poll
  14: <futures::future::then::Then<A,B,F> as futures::future::Future>::poll
  15: <futures::future::map::Map<A,F> as futures::future::Future>::poll
  16: <futures::future::either::Either<A,B> as futures::future::Future>::poll
  17: futures::task_impl::std::set
  18: std::thread::local::LocalKey<T>::with
  19: futures::future::Future::wait
  20: jsonrpc_core::io::IoHandler<M>::handle_request_sync
  21: migration_core::rpc_api::RpcApi::handle
  22: migration_engine::main
  23: std::rt::lang_start::{{closure}}
  24: std::panicking::try::do_call
  25: __rust_maybe_catch_panic
  26: std::rt::lang_start_internal
  27: main

```
