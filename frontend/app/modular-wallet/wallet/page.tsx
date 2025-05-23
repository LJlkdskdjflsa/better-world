"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wallet, ArrowDownToLine, ArrowUpFromLine, Copy, CheckCircle, Loader2, Heart } from "lucide-react"
import Link from "next/link"
import { useWallet } from "../providers/wallet-provider"
import TransactionHistoryItem from "../components/transaction-history-item"

export default function WalletPage() {
  const { account, balance, refreshBalance } = useWallet()
  const [copied, setCopied] = useState(false)
  const [depositAmount, setDepositAmount] = useState("")
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [loading, setLoading] = useState(false)

  const walletAddress = account?.address
  const numericBalance = Number(balance)

  const copyToClipboard = () => {
    if (!walletAddress) return
    navigator.clipboard.writeText(walletAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDeposit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate deposit process
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setDepositAmount("")
      await refreshBalance()
    } catch (error) {
      console.error("Deposit failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleWithdraw = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate withdrawal process
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setWithdrawAmount("")
      await refreshBalance()
    } catch (error) {
      console.error("Withdrawal failed:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Your Wallet</h1>
          <Link href="/modular-wallet">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Wallet Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 text-center">
                <div className="text-3xl font-bold">{numericBalance.toFixed(2)} USDC</div>
                <div className="text-sm text-muted-foreground">Available for donations</div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="mb-2 flex items-center justify-between">
                  <Label className="text-sm font-medium">Your Wallet Address</Label>
                  <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs" onClick={copyToClipboard}>
                    {copied ? (
                      <>
                        <CheckCircle className="h-3 w-3" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
                <div className="overflow-x-auto rounded bg-gray-100 p-2 text-xs font-mono">{walletAddress || 'Not connected'}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Manage Funds</CardTitle>
              <CardDescription>Deposit or withdraw USDC from your wallet</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="deposit">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="deposit">Deposit</TabsTrigger>
                  <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
                </TabsList>
                <TabsContent value="deposit" className="mt-4 space-y-4">
                  <form onSubmit={handleDeposit}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="depositAmount">Amount (USDC)</Label>
                        <Input
                          id="depositAmount"
                          type="number"
                          placeholder="10.00"
                          min="1"
                          step="0.01"
                          value={depositAmount}
                          onChange={(e) => setDepositAmount(e.target.value)}
                          required
                        />
                      </div>
                      <div className="rounded-lg border p-4">
                        <h3 className="mb-2 text-sm font-medium">Deposit Instructions</h3>
                        <p className="mb-4 text-xs text-muted-foreground">Send USDC to your wallet address:</p>
                        <div className="mb-2 overflow-x-auto rounded bg-gray-100 p-2 text-xs font-mono">
                          {walletAddress || 'Not connected'}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Your balance will be updated once the transaction is confirmed.
                        </p>
                      </div>
                      <Button type="submit" className="w-full gap-2" disabled={loading || !depositAmount}>
                        {loading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <ArrowDownToLine className="h-4 w-4" />
                        )}
                        Deposit Funds
                      </Button>
                    </div>
                  </form>
                </TabsContent>
                <TabsContent value="withdraw" className="mt-4 space-y-4">
                  <form onSubmit={handleWithdraw}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="withdrawAmount">Amount (USDC)</Label>
                        <Input
                          id="withdrawAmount"
                          type="number"
                          placeholder="10.00"
                          min="1"
                          max={numericBalance}
                          step="0.01"
                          value={withdrawAmount}
                          onChange={(e) => setWithdrawAmount(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="withdrawAddress">Destination Address</Label>
                        <Input id="withdrawAddress" placeholder="0x..." required />
                      </div>
                      <Button
                        type="submit"
                        className="w-full gap-2"
                        disabled={loading || !withdrawAmount || Number(withdrawAmount) > numericBalance}
                      >
                        {loading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <ArrowUpFromLine className="h-4 w-4" />
                        )}
                        Withdraw Funds
                      </Button>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>Recent deposits, withdrawals, and donations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <TransactionHistoryItem
                  type="donation"
                  amount={10}
                  source="Your Wallet"
                  destination="Clean Water Initiative"
                  date="Apr 4, 2025"
                  time="3:15 PM"
                />
                <TransactionHistoryItem
                  type="deposit"
                  amount={50}
                  source="External Wallet"
                  destination="Your Wallet"
                  date="Apr 3, 2025"
                  time="10:22 AM"
                />
                <TransactionHistoryItem
                  type="withdrawal"
                  amount={5}
                  source="Your Wallet"
                  destination="External Wallet"
                  date="Apr 1, 2025"
                  time="2:45 PM"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Transactions
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

