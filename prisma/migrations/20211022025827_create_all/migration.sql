-- CreateTable
CREATE TABLE "user_on_test" (
    "user_id" TEXT NOT NULL,
    "test_id" TEXT NOT NULL,
    "is_teacher" BOOLEAN NOT NULL DEFAULT false,
    "points" REAL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("user_id", "test_id"),
    CONSTRAINT "user_on_test_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "user_on_test_test_id_fkey" FOREIGN KEY ("test_id") REFERENCES "tests" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "tests" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "is_open" BOOLEAN NOT NULL DEFAULT false,
    "max_questions" INTEGER NOT NULL DEFAULT -1,
    "randomize" BOOLEAN NOT NULL DEFAULT false,
    "clue_detect" BOOLEAN NOT NULL DEFAULT false,
    "time_mode" TEXT NOT NULL DEFAULT 'total',
    "can_edit" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "questions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "test_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "value" REAL NOT NULL DEFAULT 0,
    "time" INTEGER NOT NULL DEFAULT -1,
    "type" TEXT NOT NULL,
    CONSTRAINT "questions_test_id_fkey" FOREIGN KEY ("test_id") REFERENCES "tests" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "options" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "question_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "is_correct" BOOLEAN NOT NULL,
    CONSTRAINT "options_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "responses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "question_id" TEXT NOT NULL,
    "option_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "responses_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "responses_option_id_fkey" FOREIGN KEY ("option_id") REFERENCES "options" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "responses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
