---
title: "TypeScriptの型システム入門"
date: "2024-02-20"
author: "ブログ管理者"
tags: ["TypeScript", "プログラミング", "型システム"]
description: "TypeScriptの型システムの基本から応用まで、実例を交えて詳しく解説します。"
published: true
---

# TypeScriptの型システム入門

TypeScriptは、JavaScriptに静的型付けを追加した言語です。型システムを活用することで、コードの安全性と保守性が大幅に向上します。

## 基本的な型

TypeScriptでは以下のような基本的な型を使用できます：

```typescript
// プリミティブ型
let name: string = "太郎";
let age: number = 25;
let isActive: boolean = true;

// 配列型
let numbers: number[] = [1, 2, 3, 4, 5];
let names: Array<string> = ["太郎", "花子"];

// オブジェクト型
interface User {
  name: string;
  age: number;
  email?: string; // オプショナル
}

const user: User = {
  name: "太郎",
  age: 25,
};
```

## ジェネリクス

ジェネリクスを使うことで、再利用可能な型安全なコンポーネントを作成できます：

```typescript
function identity<T>(arg: T): T {
  return arg;
}

const output = identity<string>("こんにちは");
```

## ユニオン型とインターセクション型

### ユニオン型

複数の型のうちいずれかを許可する場合に使用します：

```typescript
type Status = "active" | "inactive" | "pending";
let userStatus: Status = "active";
```

### インターセクション型

複数の型を組み合わせる場合に使用します：

```typescript
interface Person {
  name: string;
}

interface Employee {
  employeeId: number;
}

type Staff = Person & Employee;

const staff: Staff = {
  name: "太郎",
  employeeId: 12345,
};
```

## 型ガード

型ガードを使用して、実行時に型を絞り込むことができます：

```typescript
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function processValue(value: string | number) {
  if (isString(value)) {
    console.log(value.toUpperCase());
  } else {
    console.log(value.toFixed(2));
  }
}
```

## まとめ

TypeScriptの型システムは非常に強力で、開発者がより安全で保守性の高いコードを書くのに役立ちます。型を適切に活用することで、バグを早期に発見し、開発効率を向上させることができます。
