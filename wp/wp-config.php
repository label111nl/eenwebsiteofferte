<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * Localized language
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'websiteofferte' );

/** Database username */
define( 'DB_USER', 'label111' );

/** Database password */
define( 'DB_PASSWORD', 'HollanD2020!!' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',          ' +;7_7uQbg?8#S-c:[hOMh9>y97Bm|axa2/T4Q;$#jc5Z<#[>s%5Y7[!P;Nax lR' );
define( 'SECURE_AUTH_KEY',   '=iF [&jkDGS|^.T5!#d3aR478T9Z*!&U)mHQ|jE}jr8AYK:?6!:-p;&H?k(x+5Ls' );
define( 'LOGGED_IN_KEY',     'w0{*P!|:M:+8o`L:]2m=3?)04-4Mgp78G >Em8Fql&YS$lGNn#ZIP:]g=~<)m6%^' );
define( 'NONCE_KEY',         'Ns/t]ws3}|F7DD!~wY(7PuK- 65Lls3RTD:wKE.LF>~%g3hDDwwpNTy!z_$% Fr-' );
define( 'AUTH_SALT',         'A<Ee4l!bnwJc&n:wiMA(iq7-.ooJ ^7cexfA?q9~(ei@N,$Ab0wBP4X( ()q<!hj' );
define( 'SECURE_AUTH_SALT',  '~J*$p7kU.1&uc`HHw?qfc0AIWwnqYfB2fXA2N&[iq6/$:14Yw0nDJ/3z-8>,%3K#' );
define( 'LOGGED_IN_SALT',    'j1qN_`FTtw2t28`PbQ~uDo:BBHLn:.=};l*1vmllrziE.Y|.P3zB>$$l2i*d+~/J' );
define( 'NONCE_SALT',        '.v+o#g,-|!WA49y?SLi[fV(*:NB,%!|@VM<qcDBc B<H =o876y+li>~M)sM#j>h' );
define( 'WP_CACHE_KEY_SALT', 'L)1+ 5#7 f=lv[a,O}Q)bhO8S+(y[.|pvGRO8]afGUlj/sx1l Sl|IIpkXt^2ysD' );


/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';


/* Add any custom values between this line and the "stop editing" line. */



/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
if ( ! defined( 'WP_DEBUG' ) ) {
	define( 'WP_DEBUG', false );
}

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
