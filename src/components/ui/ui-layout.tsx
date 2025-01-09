'use client'

import {usePathname} from 'next/navigation'
import * as React from 'react'
import {ReactNode, Suspense, useEffect, useRef} from 'react'
import toast, {Toaster} from 'react-hot-toast'

import {AccountBalance, AccountChecker} from '../account/account-ui'
import {ClusterChecker, ExplorerLink} from '../cluster/cluster-ui'
import {useAnchorProvider, WalletButton} from '../solana/solana-provider'
import {LAMPORTS_PER_SOL} from "@solana/web3.js";
import {useCluster} from "@/components/cluster/cluster-data-access";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub, faLinkedin} from "@fortawesome/free-brands-svg-icons";

export function UiLayout({ children, links }: { children: ReactNode; links: { label: string; path: string }[] }) {
  const pathname = usePathname()
    const provider = useAnchorProvider();
    // const query = useGetBalance({ provider })
    const {cluster} = useCluster();

  return (
    <div className="h-full flex flex-col overflow-y-scroll">
      <div className="flex justify-end p-3">
        <WalletButton />
      </div>
        <div className="flex justify-center mb-2">
            <div className="flex text-2xl gap-4 items-center">
                <Link href={'https://www.linkedin.com/in/lusajo-shitindi-12368b20a/?originalSubdomain=tz'}>
                    <FontAwesomeIcon className="text-[#0177B5]"
                                     icon={faLinkedin}/>
                </Link>
                <Link href={'https://github.com/lusajo-143'}>
                    <FontAwesomeIcon className="text-gray-900"
                                     icon={faGithub}/>
                </Link>
                <Link href={'https://x.com/lusajo143'}>
                    <img src="/x.svg" alt="Logo" width={23} height={40}/>
                </Link>
                <Link
                    href={'https://www.upwork.com/freelancers/~010b7593e93155e444?referrer_url_path=%2Fnx%2Fsearch%2Ftalent%2Fdetails%2F~010b7593e93155e444%2Fprofile'}>
                    <img src="/upwork.svg" alt="Logo" width={70} height={40}/>
                </Link>
            </div>
        </div>
        <ClusterChecker>
            <AccountChecker/>
        </ClusterChecker>
        <div className="flex-grow mx-4 lg:mx-auto !bg-green">
            <Suspense
                fallback={
                    <div className="my-32">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                }
            >
                {children}
            </Suspense>
        <Toaster position="bottom-right" />
      </div>
        <footer className="flex justify-center gap-4 p-4 text-xs text-base-content">
            <div className="flex">
                <div className="flex gap-1">
                    <span>Cluster:</span>
                    <span className="text-primary">{cluster.name}</span>
                </div>
            </div>
            <div className="border-r border-gray-400"></div>
            <div className="flex">
                <div className="flex gap-1">
                    <span>Balance:</span>
                    <AccountBalance address={provider.wallet.publicKey} small={true}
                                    customClasses={"text-primary cursor-pointer hover:font-bold"}/>
                </div>
            </div>
            <div className="border-r border-gray-400"></div>
            <div className="flex">
                <div className="flex gap-1">
                    <span>Tx History:</span>
                    <ExplorerLink
                        className="text-primary underline"
                        path={`account/${provider.wallet.publicKey?.toBase58()}`}
                        label={ellipsify(provider.wallet.publicKey?.toBase58())}
                    />
                </div>
            </div>
            {/*<aside>*/}
            {/*  <p>*/}
            {/*    Developed by{' '}*/}
            {/*    <a*/}
            {/*      className="link hover:text-white"*/}
            {/*      href="https://github.com/lusajo-143"*/}
            {/*      target="_blank"*/}
            {/*      rel="noopener noreferrer"*/}
            {/*    >*/}
            {/*      Lusajo Shitindi*/}
            {/*    </a>*/}
            {/*  </p>*/}
            {/*</aside>*/}
      </footer>
    </div>
  )
}

export function AppModal({
  children,
  title,
  hide,
  show,
  submit,
  submitDisabled,
  submitLabel,
}: {
  children: ReactNode
  title: string
  hide: () => void
  show: boolean
  submit?: () => void
  submitDisabled?: boolean
  submitLabel?: string
}) {
  const dialogRef = useRef<HTMLDialogElement | null>(null)

  useEffect(() => {
    if (!dialogRef.current) return
    if (show) {
      dialogRef.current.showModal()
    } else {
      dialogRef.current.close()
    }
  }, [show, dialogRef])

  return (
    <dialog className="modal" ref={dialogRef}>
      <div className="modal-box space-y-5">
        <h3 className="font-bold text-lg">{title}</h3>
        {children}
        <div className="modal-action">
          <div className="join space-x-2">
            {submit ? (
              <button className="btn btn-xs lg:btn-md btn-primary" onClick={submit} disabled={submitDisabled}>
                {submitLabel || 'Save'}
              </button>
            ) : null}
            <button onClick={hide} className="btn">
              Close
            </button>
          </div>
        </div>
      </div>
    </dialog>
  )
}

export function AppHero({
  children,
  title,
  subtitle,
}: {
  children?: ReactNode
  title: ReactNode
  subtitle: ReactNode
}) {
  return (
    <div className="hero py-[64px]">
      <div className="hero-content text-center">
        <div className="max-w-2xl">
          {typeof title === 'string' ? <h1 className="text-5xl font-bold">{title}</h1> : title}
          {typeof subtitle === 'string' ? <p className="py-6">{subtitle}</p> : subtitle}
          {children}
        </div>
      </div>
    </div>
  )
}

export function ellipsify(str = '', len = 4) {
  if (str.length > 30) {
    return str.substring(0, len) + '..' + str.substring(str.length - len, str.length)
  }
  return str
}

export function useTransactionToast() {
  return (signature: string) => {
    toast.success(
      <div className={'text-center'}>
        <div className="text-lg">Transaction sent</div>
        <ExplorerLink path={`tx/${signature}`} label={'View Transaction'} className="btn btn-xs btn-primary" />
      </div>,
    )
  }
}

export function BalanceSol({balance}: { balance: number }) {
    return <span>{Math.round((balance / LAMPORTS_PER_SOL) * 100000) / 100000}</span>
}
