-- CreateTable
CREATE TABLE "Player" (
    "playFabId" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "experience" INTEGER NOT NULL,
    "rank" INTEGER,
    "rating" INTEGER,
    "rankedWins" INTEGER NOT NULL,
    "rankedLosses" INTEGER NOT NULL,
    "rankedPeakRating" INTEGER,
    "season" TEXT NOT NULL,
    "unrankedWins" INTEGER NOT NULL,
    "unrankedLosses" INTEGER NOT NULL,
    "unrankedRating" INTEGER,
    "continentCode" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "dreadwyrmExp" INTEGER,
    "selicyExp" INTEGER,
    "saffronExp" INTEGER,
    "chirettaExp" INTEGER,
    "maypulExp" INTEGER,
    "gunnerExp" INTEGER,
    "harissaExp" INTEGER,
    "revaExp" INTEGER,
    "violetteExp" INTEGER,
    "neeraExp" INTEGER,
    "terraExp" INTEGER,
    "queenExp" INTEGER,
    "shopkeeperExp" INTEGER,
    "hazelExp" INTEGER,
    "shisoExp" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("playFabId")
);

-- CreateTable
CREATE TABLE "PlayerSnapshot" (
    "id" TEXT NOT NULL,
    "playerPlayFabId" TEXT NOT NULL,
    "playFabId" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "experience" INTEGER NOT NULL,
    "rank" INTEGER,
    "rating" INTEGER,
    "rankedWins" INTEGER NOT NULL,
    "rankedLosses" INTEGER NOT NULL,
    "rankedPeakRating" INTEGER,
    "season" TEXT NOT NULL,
    "unrankedWins" INTEGER NOT NULL,
    "unrankedLosses" INTEGER NOT NULL,
    "unrankedRating" INTEGER,
    "continentCode" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "dreadwyrmExp" INTEGER,
    "selicyExp" INTEGER,
    "saffronExp" INTEGER,
    "chirettaExp" INTEGER,
    "maypulExp" INTEGER,
    "gunnerExp" INTEGER,
    "harissaExp" INTEGER,
    "revaExp" INTEGER,
    "violetteExp" INTEGER,
    "neeraExp" INTEGER,
    "terraExp" INTEGER,
    "queenExp" INTEGER,
    "shopkeeperExp" INTEGER,
    "hazelExp" INTEGER,
    "shisoExp" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlayerSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Player_playFabId_idx" ON "Player"("playFabId");

-- CreateIndex
CREATE INDEX "PlayerSnapshot_playFabId_idx" ON "PlayerSnapshot"("playFabId");

-- AddForeignKey
ALTER TABLE "PlayerSnapshot" ADD CONSTRAINT "PlayerSnapshot_playerPlayFabId_fkey" FOREIGN KEY ("playerPlayFabId") REFERENCES "Player"("playFabId") ON DELETE RESTRICT ON UPDATE CASCADE;

